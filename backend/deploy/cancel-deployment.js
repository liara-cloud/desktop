const generateLog = require('./log');
const got = require('./got-instance');
const logger = require('../configs/logger');
const {logs, release, state} = require('./deploy');
const {default: cancelDeployment} = require('@liara/cli/lib/services/cancel-deployment');

const cancelDeploy = async (event, args) => {
  const { api_token, region } = args;
  event.sender.send('deploy',generateLog('Canceling Deployment\n', 'build', 'pending'));
  state.canceled = true
  if (state.upload) {
    state.upload.cancel()
  }
  const retryOptions = {
    retries: 3,
    onRetry: (error, attempt) => {
      logger.push(error)
      logs.push(`${attempt}: Could not cancel  retrying...`);
      event.sender.send('deploy',generateLog(`${attempt}: Could not cancel  retrying...\n`, 'build', 'error'));
    },
  };
  if (release.id) {
    await cancelDeployment(got(api_token, region), release.id, retryOptions);
  }
};

module.exports = cancelDeploy