const got = require('./got-instance')
const {logs, release} = require('./deploy');
const {default: cancelDeployment} = require('@liara/cli/lib/services/cancel-deployment');
const logger = require('../configs/logger');

const cancelDeploy = async (event, args) => {
  const { api_token, region } = args;
  const retryOptions = {
    retries: 3,
    onRetry: (error, attempt) => {
      logger.push(error)
      logs.push(`${attempt}: Could not cancel  retrying...`);
      event.sender.send(generateLog(`${attempt}: Could not cancel  retrying...`, 'build', 'error'));
    },
  };
  if (release.id) {
    await cancelDeployment(got(api_token, region), release.id, retryOptions);
  }
};

module.exports = cancelDeploy