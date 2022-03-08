const logger = require('../configs/logger');
const { writeFile, readJson } = require('fs-extra');
const { readLiaraJson } = require('./account-management');
const existsLiaraAuthJson = require('./check-global-config');
const { envConfig: {GLOBAL_CONF_PATH, NEW_GLOBAL_CONFIG_PATH} } = require('../configs/envConfig');

exports.removeAccount = async (email, region) => {
  try {
    logger.info('Start to remove account');
    const globalConf = await existsLiaraAuthJson()
    let content = await readJson(globalConf ? NEW_GLOBAL_CONFIG_PATH : GLOBAL_CONF_PATH, {throws: false}) || {}
    Object.entries(content.accounts).map(([key, value]) => {
      if (value.email === email && value.region === region) {
        delete content.accounts[key];
        content.current = content.current === key ? null : content.current;
      }
    });
    if (!globalConf && !Object.values(content.accounts).length) {
      content = {};
    }
    await writeFile(globalConf ? NEW_GLOBAL_CONFIG_PATH : GLOBAL_CONF_PATH, JSON.stringify(content));
    logger.info('Liara.json updated with remove account');
    return await readLiaraJson();
  } catch (error) {
    logger.error(error);
    return [];
  }
};
