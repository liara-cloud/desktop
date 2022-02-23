const logger = require('../configs/logger');
const { readFile, writeFile } = require('fs-extra');
const { envConfig } = require('../configs/envConfig');

exports.chanegCurrentAccount = async (email, region) => {
  try {
    logger.info('Start to change Current account');
    const content = JSON.parse(await readFile(envConfig.GLOBAL_CONF_PATH)) || {};
    let changeOne = true;

    const accounts = Object.entries(content.accounts).map(([key, value]) => {
      value.current = false;
      if (value.email === email && value.region === region && changeOne) {
        value.current = true;
        content.current = key;
        content.api_token = value.api_token
        content.region = value.region
        changeOne = false;
      }
      return { [key]: value };
    });
    await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(content));
    logger.info('Liara.json updated with new current');
    return accounts;
  } catch (error) {
    logger.error(error);
    return [];
  }
};
