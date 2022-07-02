const bytes = require("bytes");
const chalk = require("chalk");
const generateLog = require("./log");
const logger = require("../configs/logger");
const gotInstance = require("./got-instance");
const { showNotification } = require("../notify");
const {statSync, remove, pathExists, readJson, writeJson} = require("fs-extra");

const {sleep} = require('../utils/wait')
const { envConfig } = require("../configs/envConfig");
const { default: upload } = require("@liara/cli/lib/services/upload");
const { default: buildLogs } = require("@liara/cli/lib/services/build-logs");
const { default: BuildFaild } = require("@liara/cli/lib/errors/build-failed");
const { default: BuildCanceled } = require("@liara/cli/lib/errors/build-cancel");
const { default: BuildTimeout } = require("@liara/cli/lib/errors/build-timeout");
const { default: createArchive } = require("@liara/cli/lib/utils/create-archive");
const { default: ReleaseFailed } = require("@liara/cli/lib/errors/release-failed");
const { default: prepareTmpDirectory } = require("@liara/cli/lib/services/tmp-dir");
const { default: collectGitInfo } = require("@liara/cli/lib/utils/collect-git-info");
const { default: mergePlatformConfigWithDefaults } = require("@liara/cli/lib/utils/merge-platform-config");

exports.logs = [];
exports.release = { id: undefined };
exports.state = {canceled: false, upload: false};

exports.deploy = async (event, args) => {
  try {
    this.state.canceled = false
    this.state.upload = false
    const {path, region, api_token, config, account_name } = args;
    const got = gotInstance(api_token, region)
    const platformDetected = config.platform
    const cachePath = envConfig.GLOBAL_CACHE_PATH
    const [ preUrl, postUrl ] = envConfig.REGION_DEPLOY_APP[region].split('api')

    const body = {
      build: {},
      args: config.args,
      port: config.port,
      cron: config.cron,
      disks: config.disks,
      type: platformDetected,
      message: config.message,
      mountPoint: config.volume,
    };

    if (config.healthCheck && !config.healthCheck.command) {
      this.logs.push("`command` field in healthCheck is required.");
      event.sender.send("deploy",generateLog("`command` field in healthCheck is required.\n","preparation-build","error"));
    }
    if (config.healthCheck && typeof config.healthCheck.command !== "string" &&
        !Array.isArray(config.healthCheck.command)
    ) {
      this.logs.push("`command` field in healthCheck must be either an array or a string.");
      event.sender.send("deploy",generateLog("`command` field in healthCheck must be either an array or a string.\n","preparation-build","error"));
    }
    if (config.healthCheck) {
      body.healthCheck = config.healthCheck;
      if (typeof config.healthCheck.command === "string") {
        body.healthCheck.command = config.healthCheck.command.split(" ");
      }
    }

    body.build.args = config["build-arg"];
    body.gitInfo = await collectGitInfo(path, logger.warn);
    body.platformConfig = mergePlatformConfigWithDefaults(path,config.platform,config[config.platform] || {},logger.info);

    // 1) Preparation Build
    this.logs.push(`App: ${config.app}`);
    event.sender.send("deploy", generateLog(`App: ${config.app}\n`, "preparation-build", "start"));
    this.logs.push(`Path: ${path}`);
    event.sender.send("deploy", generateLog(`Path: ${path}\n`, "preparation-build", "pending"));
    this.logs.push(`Detected platform: ${platformDetected}`);
    event.sender.send("deploy", generateLog(`Detected platform: ${platformDetected}\n`, "preparation-build", "pending"));
    this.logs.push(`Port: ${config.port}`);
    event.sender.send("deploy", generateLog(`Port: ${config.port}\n`, "preparation-build", "pending"));

    if (config.volume) {
      this.logs.push(`"volume" field is deprecated. Please use "disks" instead: https://docs.liara.ir/apps/disks`)
      event.sender.send('deploy', generateLog(`"volume" field is deprecated. Please use "disks" instead: https://docs.liara.ir/apps/disks\n`, 'preparation-build', 'pending'))
    }
    if (config.disks) {
      this.logs.push("Disks:");
      event.sender.send("deploy", generateLog("Disks:\n", "preparation-build", "pending"));
      for (const disk of config.disks) {
        this.logs.push(`${disk.name} -> ${disk.mountTo}`);
        event.sender.send("deploy", generateLog(`${disk.name} -> ${disk.mountTo}\n`, "preparation-build", "pending"));
      }
    }
    this.logs.push(`Creating an archive...`)
    event.sender.send('deploy',generateLog(`Creating an archive...\n`, 'preparation-build', 'pending'));
    if (this.state.canceled === true) {
      this.state.canceled = false
      event.sender.send('deploy', generateLog('Build canceled.', 'preparation-build', 'cancel'))
      return this.logs.push('Build canceled.')
    }
    const sourcePath = prepareTmpDirectory();
    await createArchive(sourcePath, path, platformDetected);
    const { size: sourceSize } = statSync(sourcePath);
    if (sourceSize > envConfig.MAX_SOURCE_SIZE) {
      await remove(sourcePath)
      throw new Error('Source is too large.')
    }
    
    const liaraCacheJson = await pathExists(cachePath) && await readJson(cachePath, {throws: false});

    await writeJson(cachePath, {...liaraCacheJson, [account_name]: {[path]: { app : config.app, port: config.port, platform: platformDetected }}})

    this.logs.push(`Compressed size: ${bytes(sourceSize)} (use .gitignore to reduce the size)`)
    event.sender.send('deploy',generateLog(`Compressed size: ${bytes(sourceSize)} ${chalk.hex('#3A6EA5')('(use .gitignore to reduce the size)')}\n`, 'preparation-build', 'finish'));

    if (this.state.canceled === true) {
      this.state.canceled = false
      event.sender.send('deploy', generateLog('Build canceled.', 'preparation-build', 'cancel'))
      return this.logs.push('Build canceled.')
    }
    // 2) Upload Source
    this.logs.push('upload started')
    event.sender.send('deploy',{log: '', percent: 0, state: 'upload-progress', status: 'start'})
    this.state.upload = upload(config.app, got, sourcePath)
    const {sourceID} = await this.state.upload.on('uploadProgress', async progress => {
      event.sender.send('deploy', {log:'',total: progress.total, transferred: progress.transferred, percent: progress.percent * 100, state: 'upload-progress', status: 'pending'})
      if (Math.floor(progress.percent * 100) == 100) {
        this.logs.push('upload finish')
        event.sender.send('deploy', {log:'',total: progress.total, transferred: progress.transferred, percent: progress.percent * 100, state: 'upload-progress', status: 'finish'})
        await sleep(2000)
        this.logs.push('Creating Release...')
        event.sender.send('deploy',generateLog('', 'build', 'start'))
      }
    }).json()
    
    // 3) create release
    
    body.sourceID = sourceID
    if (this.state.canceled === true) {
      this.state.canceled = false
      event.sender.send('deploy', generateLog('Build canceled.', 'preparation-build', 'cancel'))
      return this.logs.push('Build canceled.')
    }

    this.release.id = (await got.post(`v2/projects/${config.app}/releases`, { json: body }).json()).releaseID
    this.logs.push('Finish Release.')
    if (this.state.canceled === true) {
      this.state.canceled = false
      event.sender.send('deploy', generateLog('Build canceled.', 'preparation-build', 'cancel'))
      return this.logs.push('Build canceled.')
    }
    // 4) Build this.logs
    await buildLogs(got, this.release.id, false, (output) => {
      if (output.state === "BUILDING" && output.line) {
        this.logs.push(output.line);
        event.sender.send("deploy", generateLog(output.line, "build", "pending"));
      }
      if (output.state === "PUSHING") {
        this.logs.push("Build finished.");
        this.logs.push("Pushing the image...");
        event.sender.send("deploy", generateLog("Build finished.\n", "build", "finish"));
        event.sender.send("deploy", generateLog("Pushing the image...\n", "publish", "start"));
      }
      if (output.state === "DEPLOYING") {
        this.logs.push("Image pushed.");
        event.sender.send("deploy", generateLog("Image pushed.\n", "publish", "pending"));
      }
    });
    this.logs.push("Release Created.");
    this.logs.push("Deployment finished successfully.");
    const url = `${preUrl}${config.app}${postUrl}`;
    this.logs.push(url);
    event.sender.send("deploy", generateLog("Release Created.\n", "publish", "pending"));
    event.sender.send("deploy", generateLog(chalk.green("Deployment finished successfully.\n"), "publish", "pending"));
    event.sender.send("deploy", generateLog(url, "publish", "finish"));
    showNotification("success", url); // change logic
  } catch (error) {
    if (error.message === 'Promise was canceled' || error instanceof BuildCanceled) {
      this.state.canceled = false
      event.sender.send('deploy',generateLog(chalk.hex('#1C4498')('Build canceled.\n'), 'build', 'cancel'))
      showNotification('cancel')
      return this.logs.push('Build canceled.')
    }
    showNotification("error");
    if (error.message === 'Source is too large.') {
      event.sender.send("deploy", generateLog(chalk.red("Source is too large. (max: 200MB)\n"), "build", "error"));
      return this.logs.push('Source is too large.')
    }
    if (error instanceof BuildFaild) {
      event.sender.send("deploy", generateLog(error.output.line, "build", "error"));
      return this.logs.push(error.output.line);
    }
    if (error instanceof BuildTimeout) {
      event.sender.send("deploy", generateLog(chalk.red("Build timed out. It tool about 10 minutes\n"), "build", "error"));
      return this.logs.push("Build timed out. It took about 10 minutes.");
    }
    if (error instanceof ReleaseFailed) {
      event.sender.send("deploy", generateLog(chalk.red("Release failed\n"), "build", "error"));
      return this.logs.push("Release failed.");
    }
    if (error.message === "TIMEOUT") {
      event.sender.send("deploy", generateLog(chalk.red("Build timed out. It took about 10 minutes."), "build", "error"));
      return this.logs.push("Build timed out. It took about 10 minutes.");
    }
    const responseBody = error.response && error.response.statusCode >= 400 && error.response.statusCode < 500
      ? JSON.parse(error.response.body)
      : {};
    if (error.response && error.response.statusCode === 404 && responseBody.message === "project_not_found") {
      const message = `App does not exist.
Please open up https://console.liara.ir/apps and create the app, first.`;
      event.sender.send("deploy", generateLog(chalk.red(message), "build", "error"));
      return this.logs.push(message);
    }
    if (error.response && error.response.statusCode === 400 && responseBody.message === "frozen_project") {
      const message = `App is frozen (not enough balance).
Please open up https://console.liara.ir/apps and unfreeze the app.`;
      event.sender.send("deploy", generateLog(chalk.red(message), "build", "error"));
      return this.logs.push(message);
    }
    if (error.response && error.response.statusCode >= 400 && error.response.statusCode < 500 && responseBody.message) {
      const message = `CODE ${error.response.statusCode}: ${responseBody.message}`;
      event.sender.send("deploy", generateLog(message, "build", "error"));
      return this.logs.push(message);
    }
    if (error.response && error.response.statusCode === 401) {
      const message = `Authentication failed.
Please login via 'liara login' command.
If you are using API token for authentication, please consider updating your API token.`;
      event.sender.send("deploy", generateLog(chalk.red(message), "build", "error"));
      return this.logs.push(message);
    }
    if (error.message.startsWith('The project contains')) {
      event.sender.send('deploy', generateLog(chalk.red(error.message), 'preparation-build', 'error'))
      return this.logs.push(error.message)
    }
    const message = `Deployment failed.
    Sorry for inconvenience. If you think it's a bug, please contact us.
    To file a ticket, please head to: https://console.liara.ir/tickets`;
    this.logs.push(message);
    event.sender.send("deploy", generateLog(chalk.red(message), "build", "error"));
    logger.error(error)
    logger.error(error.message);
  }
};
