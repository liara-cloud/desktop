const logger = require('../configs/logger');
const gotInstance = require('../deploy/got-instance');


exports.getProjects = async (apiToken, region) => {
  try {
    logger.info('Start to get user projects');

    const response = await gotInstance(apiToken, region)
      .get('v1/projects', {
        timeout: 10 * 1000,
      })
      .json();
    
    logger.info(`Get Projects Data: ${response.projects}`);

    return response.projects;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
