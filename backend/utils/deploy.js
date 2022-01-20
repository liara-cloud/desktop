const { fork } = require('child_process');
const { EventEmitter } = require('events');

const appRootDir = require('app-root-dir').get();

const logger = require('../configs/logger');
const { envConfig } = require('../configs/envConfig');
const { showNotification } = require('../notify');

exports.eventEmmit = new EventEmitter();
exports.logs = [];

exports.deploy = (event, args) => {
  const { app, path, port, region } = args;
  const liara =
    envConfig.PLATFORM === 'win32'
      ? `${appRootDir}\\node_modules\\@liara\\cli\\bin\\run`
      : `${appRootDir}/node_modules/@liara/cli/bin/run`;

  const child = fork(
    liara,
    ['deploy', `--app`, app, `--port`, port, `--path`, path, `--detach`],
    {
      stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
    }
  );

  logger.info('Deployment started');
  child.on('close', async (code) => {
    if (code == 2) {
      showNotification('error');
    }
    if (code == 0) {
      showNotification('done', app, region);
    }
  });

  child.on('error', (err) => {
    logger.error(err);
    if (err.message == 'Channel closed') {
      return;
    }
  });

  child.on('message', (message) => {
    this.logs.push(message);
    console.log(message);
    event.sender.send('deploy', message);
  });

  this.eventEmmit.on('cancel-deploy', () => {
    child.send({ message: 'cancel' });
  });
};
