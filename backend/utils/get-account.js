const logger = require('../configs/logger');
const gotInstance = require('../deploy/got-instance');

exports.getUser = async (apiToken, region) => {
  logger.info('Start to get user data');
  const response = await gotInstance(apiToken, region)
    .get('v1/me', {
      timeout: 10 * 1000,
    })
    .json();
  logger.info(`Get User Data: ${response.user}`);
  return response.user;
};
