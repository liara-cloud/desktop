const logger = require('../configs/logger');
const gotInstance = require('../deploy/got-instance');

exports.getUser = async (apiToken, region) => {
  try {
    logger.info('Start to get user data');
    const response = await gotInstance(apiToken, region)
      .get('v1/me', {
        timeout: 10 * 1000,
      })
      .json();
    logger.info(`Get User Data: ${response.user}`);
    return response.user;
  } catch (error) {
    if (error.code === 'EAI_AGAIN') {
      logger.info('User network connection lost.');
      throw error;
    }
    if (error.response && error.response.statusMessage !== 'Unauthorized') {
      throw err;
    }
    throw new Error(JSON.stringify({ apiToken, region }));
  }
};
