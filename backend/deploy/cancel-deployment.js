const generateLog = require('./log');
const got = require('./got-instance');
const {logs, release} = require('./deploy');
const logger = require('../configs/logger');
const {default: cancelDeployment} = require('@liara/cli/lib/services/cancel-deployment');

const cancelDeploy = async (event, args) => {
  const { api_token, region, app } = args;
  event.sender.send('deploy',generateLog('Canceling Deployment', 'build', 'pending'));
  const retryOptions = {
    retries: 3,
    onRetry: (error, attempt) => {
      logger.push(error)
      logs.push(`${attempt}: Could not cancel  retrying...`);
      event.sender.send('deploy',generateLog(`${attempt}: Could not cancel  retrying...`, 'build', 'error'));
    },
  };
  if (release.id) {
    await cancelDeployment(got(api_token, region), release.id, retryOptions);
  }
};

module.exports = cancelDeploy