const logger = require('../configs/logger');
const { writeFile, readJSON } = require('fs-extra');
const existsLiaraAuthJson = require('./check-global-config');
const { envConfig: {GLOBAL_CONF_PATH, NEW_GLOBAL_CONFIG_PATH} } = require('../configs/envConfig');

exports.chanegCurrentAccount = async (email, region) => {
  try {
    logger.info('Start to change Current account');
    const globalConf = await existsLiaraAuthJson()

    const content = await readJSON(globalConf? NEW_GLOBAL_CONFIG_PATH: GLOBAL_CONF_PATH, {
      throws: false
    }) || {}
    let changeOne = true;

    const accounts = Object.entries(content.accounts).map(([key, value]) => {
      value.current = false;
      if (value.email === email && value.region === region && changeOne) {
        value.current = true;
        content.current = !globalConf ? key : undefined
        content.api_token = !globalConf ? value.api_token : undefined
        content.region = !globalConf ? value.region : undefined
        changeOne = false;
      }
      return { [key]: value };
    });
    await writeFile(globalConf ? NEW_GLOBAL_CONFIG_PATH : GLOBAL_CONF_PATH, JSON.stringify(content));
    logger.info('Liara.json updated with new current');
    return accounts;
  } catch (error) {
    logger.error(error);
    return [];
  }
};
