const { default: axios } = require('axios');
const logger = require('../configs/logger');
const gotInstance = require('../deploy/got-instance');
const { envConfig } = require('../configs/envConfig');

exports.getUser = async (apiToken, region) => {
  try {
    logger.info('Start to get user data');
    const response = await gotInstance(apiToken, region)
      .get('v1/me', {
        timeout: 1 * 1000,
      })
      .json();
    logger.info(`Get User Data: ${response.user}`);
    return response.user;
  } catch (error) {
    logger.info(error);
    return {};
  }
};