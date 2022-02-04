const fs = require('fs-extra');
const bytes = require('bytes');

const generateLog = require('./log');
const logger = require('../configs/logger');
const gotInstance = require('./got-instance');
const { envConfig } = require('../configs/envConfig');
const {default: upload} = require('@liara/cli/lib/services/upload');
const {default: buildLogs} = require('@liara/cli/lib/services/build-logs');
const {default: BuildFaild} = require('@liara/cli/lib/errors/build-failed');
const {default: BuildCanceled} = require('@liara/cli/lib/errors/build-cancel');
const {default: BuildTimeout} = require('@liara/cli/lib/errors/build-timeout');
const {default: createArchive} = require('@liara/cli/lib/utils/create-archive');
const {default: ReleaseFailed} = require('@liara/cli/lib/errors/release-failed');
const {default: prepareTmpDirectory} = require('@liara/cli/lib/services/tmp-dir');
const {default: detectPlatform} = require('@liara/cli/lib/utils/detect-platform.js');


exports.logs = [];
exports.release = {id: undefined};

exports.deploy = async (event, args) => {
  try {
    const { app, path, port, region, api_token } = args;
    const platform = detectPlatform(path)
    const got = gotInstance(api_token, region)
    const [ preUrl, postUrl ] = envConfig.REGION_API_URL[region].split('api')

    let isCanceled = false
    // 1) Preparation Build
    this.logs.push(`App: ${app}`);
    event.sender.send(generateLog(`App: ${app}`, 'preparation-build', 'start'));
    this.logs.push(`Path: ${path}`);
    event.sender.send(generateLog(`Path: ${path}`, 'preparation-build', 'pending'));
    this.logs.push(`Detected platform: ${platform}`)
    event.sender.send(`Detected platform: ${platform}`, 'preparation-build', 'pending');
    this.logs.push(`Port: ${port}`)
    event.sender.send(generateLog(`Port: ${port}`, 'preparation-build', 'pending'));
    this.logs.push(`Creating an archive...`)
    event.sender.send(generateLog(`Creating an archive...`, 'preparation-build', 'pending'));

    const sourcePath = prepareTmpDirectory()
    await createArchive(sourcePath, path, platform)
    const { size: sourceSize } = fs.statSync(sourcePath)
    if (sourceSize > envConfig.MAX_SOURCE_SIZE) {
      event.sender.send(generateLog('Source is too large. (max: 200MB)', 'preparation-build', 'error'));
      throw new Error('Source is too large. (max: 200MB)')
    }
    this.logs.push(`Compressed size: ${bytes(sourceSize)} (use .gitignore to reduce the size)`)
    event.sender.send(generateLog(`Compressed size: ${bytes(sourceSize)} (use .gitignore to reduce the size)`, 'preparation-build', 'finish'));


    // 2) Upload Source
    this.logs.push('upload started')
    event.sender.send(generateLog(0, 'upload-progress', 'start'))
    const {sourceID} = await upload(app, got, sourcePath, (progress) => {
        this.logs.push(progress.percent * 100)
        event.sender.send(generateLog(progress.percent * 100, 'upload-progress', 'pending'))
      });

    this.logs.push('upload finish')
    event.sender.send(generateLog(100, 'upload-progress', 'finish'))
    
    
    // 3) create release
    this.logs.push('Creating Release...')
    event.sender.send(generateLog('Creating Release...', 'build', 'start'))
    const body = {port, type: platform, sourceID}
    this.release.id = (await got.post(`v2/projects/${app}/releases`, { json: body }).json()).releaseID
    this.logs.push('Finish Release.')
    event.sender.send(generateLog('Finish Release.', 'build', 'pending'))

    // 4) Build this.logs
    await buildLogs(got, this.release.id, isCanceled, (output) => {
      if (output.state === 'DEPLOYING') {
        this.logs.push('Image pushed.')
        this.logs.push('Creating a new release...')
        event.sender.send(generateLog('Image pushed.', 'build', 'pending'))
        event.sender.send(generateLog('Creating a new release...', 'build', 'pending'))
      }
      if (output.state === 'BUILDING' && output.line) {
        this.logs.push(output.line)
        event.sender.send(generateLog(output.line, 'build', 'pending'))
      }
      if (output.state === 'PUSHING') {
        this.logs.push('Build finished.')
        this.logs.push('Pushing the image...')
        event.sender.send(generateLog('Build finished.', 'build', 'pending'))
        event.sender.send(generateLog('Pushing the image...', 'build', 'pending'))
      }
    })
    this.logs.push('Release Created.')
    this.logs.push('Deployment finished successfully.')
    this.logs.push('Open up the url below in your browser:')
    this.logs.push(`${preUrl}${app}${postUrl}`)
    event.sender.send(generateLog('Release Created.', 'build', 'pending'))
    event.sender.send(generateLog('Deployment finished successfully.', 'build', 'pending'))
    event.sender.send(generateLog('Open up the url below in your browser:', 'build', 'pending'))
    event.sender.send(generateLog(`${preUrl}//${app}/${postUrl}`, 'build', 'finish'))

  } catch (error) {
    if (error instanceof BuildFaild) {
      event.sender.send(generateLog(error.output.line, 'build', 'error'))
      return this.logs.push(error.output.line)
    }
    if (error instanceof BuildCanceled) {
      event.sender.send(generateLog('Build canceled.', 'build', 'cancel'))
      return this.logs.push('Build canceled.')
    }
    if (error instanceof BuildTimeout) {
      event.sender.send(generateLog('Build timed out. It tool about 10 minutes', 'build', 'error'))
      return this.logs.push('Build timed out. It took about 10 minutes.')
    }
    if (error instanceof ReleaseFailed) {
      event.sender.send(generateLog('Release failed', 'build', 'error'))
      return this.logs.push('Release failed.')
    }
    this.logs.push(`Error: ${error.message}`)
    event.sender.send(generateLog(error.message, 'build', 'error'))
    logger.error(error);
  }
};


