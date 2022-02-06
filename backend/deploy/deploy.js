const fs = require('fs-extra');
const bytes = require('bytes');

const generateLog = require('./log');
const logger = require('../configs/logger');
const gotInstance = require('./got-instance');
const {showNotification} = require('../notify')

const {envConfig} = require('../configs/envConfig');
const readProjectConfig = require('./read-project-config')
const {default: upload} = require('@liara/cli/lib/services/upload');
const {default: buildLogs} = require('@liara/cli/lib/services/build-logs');
const {default: BuildFaild} = require('@liara/cli/lib/errors/build-failed');
const {default: BuildCanceled} = require('@liara/cli/lib/errors/build-cancel');
const {default: BuildTimeout} = require('@liara/cli/lib/errors/build-timeout');
const {default: createArchive} = require('@liara/cli/lib/utils/create-archive');
const {default: ReleaseFailed} = require('@liara/cli/lib/errors/release-failed');
const {default: prepareTmpDirectory} = require('@liara/cli/lib/services/tmp-dir');
const {default: collectGitInfo} = require('@liara/cli/lib/utils/collect-git-info')
const {default: detectPlatform} = require('@liara/cli/lib/utils/detect-platform.js');
const {default: mergePlatformConfigWithDefaults} = require('@liara/cli/lib/utils/merge-platform-config')

exports.logs = [];
exports.release = {id: undefined};

exports.deploy = async (event, args) => {
  try {
    const {path, region, api_token, config } = args;
    // const body = readProjectConfig(path) // About Syntax Error
    const got = gotInstance(api_token, region)
    const platformDetected = config.platform || detectPlatform(path)
    const [ preUrl, postUrl ] = envConfig.REGION_DEPLOY_APP[region].split('api')
    
    const body = {
      build: {},
      args: config.args,
      port: config.port,
      cron: config.cron,
      disks: config.disks,
      type: config.platform,
      message: config.message,
      mountPoint: config.volume
    }

    if(config.healthCheck && ! config.healthCheck.command) {
      this.logs.push('`command` field in healthCheck is required.')
      event.sender.send('deploy', generateLog('`command` field in healthCheck is required.', 'preparation-build', 'error'))
    }
    if(config.healthCheck &&
        typeof config.healthCheck.command !== 'string' &&
        ! Array.isArray(config.healthCheck.command)
    ) {
      this.logs.push('`command` field in healthCheck must be either an array or a string.')
      event.sender.send('deploy', generateLog('`command` field in healthCheck must be either an array or a string.', 'preparation-build', 'error'))
    }
    if(config.healthCheck) {
      body.healthCheck = config.healthCheck;

      if(typeof config.healthCheck.command === 'string') {
        body.healthCheck.command = config.healthCheck.command.split(' ')
      }
    }

    body.build.args = config['build-arg']
    // body.gitInfo = collectGitInfo(path, logger.warn)
    body.platformConfig = mergePlatformConfigWithDefaults(path, config.platform, config[body.platform] || {}, logger.info)

    // 1) Preparation Build
    this.logs.push(`App: ${config.app}`);
    event.sender.send('deploy',generateLog(`App: ${config.app}`, 'preparation-build', 'start'));
    this.logs.push(`Path: ${path}`);
    event.sender.send('deploy',generateLog(`Path: ${path}`, 'preparation-build', 'pending'));

    this.logs.push(`Detected platform: ${platformDetected}`)
    event.sender.send('deploy',generateLog(`Detected platform: ${platformDetected}`, 'preparation-build', 'pending'));
    this.logs.push(`Port: ${config.port}`)
    event.sender.send('deploy',generateLog(`Port: ${config.port}`, 'preparation-build', 'pending'));

    if (config.volume) {
      this.logs.push(`"volume" field is deprecated. Please use "disks" instead: https://docs.liara.ir/apps/disks`)
      return event.sender.send('deploy', generateLog(`"volume" field is deprecated. Please use "disks" instead: https://docs.liara.ir/apps/disks`, 'preparation-build', 'pending'))
    }
    if (config.disks) {
      this.logs.push('Disks:')
      event.sender.send('deploy',generateLog('Disks:', 'preparation-build', 'pending'));
      for (const disk of config.disks) {
        this.logs.push(`${disk.name} -> ${disk.mountTo}`)
        event.sender.send('deploy',generateLog(`${disk.name} -> ${disk.mountTo}`, 'preparation-build', 'pending'));
      }
    }

    this.logs.push(`Creating an archive...`)
    event.sender.send('deploy',generateLog(`Creating an archive...`, 'preparation-build', 'pending'));

    const sourcePath = prepareTmpDirectory()
    await createArchive(sourcePath, path, platformDetected)
    const { size: sourceSize } = fs.statSync(sourcePath)
    if (sourceSize > envConfig.MAX_SOURCE_SIZE) {
      event.sender.send('deploy',generateLog('Source is too large. (max: 200MB)', 'preparation-build', 'error'));
      throw new Error('Source is too large. (max: 200MB)')
    }
    this.logs.push(`Compressed size: ${bytes(sourceSize)} (use .gitignore to reduce the size)`)
    event.sender.send('deploy',generateLog(`Compressed size: ${bytes(sourceSize)} (use .gitignore to reduce the size)`, 'preparation-build', 'finish'));


    // 2) Upload Source
    this.logs.push('upload started')
    event.sender.send('deploy',generateLog(0, 'upload-progress', 'start'))
    const {sourceID} = await upload(config.app, got, sourcePath, (progress) => {
        this.logs.push(progress.percent * 100)
        event.sender.send('deploy',generateLog(progress.percent * 100, 'upload-progress', 'pending'))
      });
    this.logs.push('upload finish')
    event.sender.send('deploy',generateLog(100, 'upload-progress', 'finish'))
    
    
    // 3) create release
    this.logs.push('Creating Release...')
    event.sender.send('deploy',generateLog('Creating Release...', 'build', 'start'))
    
    body.sourceID = sourceID

    this.release.id = (await got.post(`v2/projects/${config.app}/releases`, { json: body }).json()).releaseID
    this.logs.push('Finish Release.')
    event.sender.send('deploy',generateLog('Finish Release.', 'build', 'pending'))
    // 4) Build this.logs
    await buildLogs(got, this.release.id, false, (output) => {
      if (output.state === 'DEPLOYING') {
        this.logs.push('Image pushed.')
        this.logs.push('Creating a new release...')
        event.sender.send('deploy',generateLog('Image pushed.', 'build', 'pending'))
        event.sender.send('deploy',generateLog('Creating a new release...', 'build', 'pending'))
      }
      if (output.state === 'BUILDING' && output.line) {
        this.logs.push(output.line)
        event.sender.send('deploy',generateLog(output.line, 'build', 'pending'))
      }
      if (output.state === 'PUSHING') {
        this.logs.push('Build finished.')
        this.logs.push('Pushing the image...')
        event.sender.send('deploy',generateLog('Build finished.', 'build', 'pending'))
        event.sender.send('deploy',generateLog('Pushing the image...', 'build', 'pending'))
      }
    })
    this.logs.push('Release Created.')
    this.logs.push('Deployment finished successfully.')
    this.logs.push('Open up the url below in your browser:')
    const url = `${preUrl}${config.app}${postUrl}`
    this.logs.push(url)
    event.sender.send('deploy',generateLog('Release Created.', 'build', 'pending'))
    event.sender.send('deploy',generateLog('Deployment finished successfully.', 'build', 'pending'))
    event.sender.send('deploy',generateLog('Open up the url below in your browser:', 'build', 'pending'))
    event.sender.send('deploy',generateLog(url, 'build', 'finish'))
    showNotification('success', url) // change logic
  } catch (error) {
    if (error instanceof BuildCanceled) {
      event.sender.send('deploy',generateLog('Build canceled.', 'build', 'cancel'))
      showNotification('cancel')
      return this.logs.push('Build canceled.')
    }
    showNotification('error')
    if (error instanceof BuildFaild) {
      event.sender.send('deploy',generateLog(error.output.line, 'build', 'error'))
      return this.logs.push(error.output.line)
    }
    if (error instanceof BuildTimeout) {
      event.sender.send('deploy',generateLog('Build timed out. It tool about 10 minutes', 'build', 'error'))
      return this.logs.push('Build timed out. It took about 10 minutes.')
    }
    if (error instanceof ReleaseFailed) {
      event.sender.send('deploy',generateLog('Release failed', 'build', 'error'))
      return this.logs.push('Release failed.')
    }
    this.logs.push(`Error: ${error}`)
    event.sender.send('deploy',generateLog(error.message, 'build', 'error'))
    logger.error(error);
  }
};


