const { writeFile, readJson } = require('fs-extra');

const logger = require('../configs/logger');
const { readLiaraJson } = require('./account-management');
const existsLiaraAuthJson = require('./check-global-config');
const {
  envConfig: { NEW_GLOBAL_CONFIG_PATH },
} = require('../configs/envConfig');

exports.removeAccount = async (email, region) => {
  try {
    logger.info('Start to remove account');

    const globalConf = await existsLiaraAuthJson();

    let content =
      (await readJson(NEW_GLOBAL_CONFIG_PATH, { throws: false })) || {};

    Object.entries(content.accounts).map(([key, value]) => {
      if (value.email === email && value.region === region) {
        delete content.accounts[key];
        content.current = content.current === key ? null : content.current;
      }
    });

    if (!globalConf && !Object.values(content.accounts).length) {
      content = {};
    }

    await writeFile(NEW_GLOBAL_CONFIG_PATH, JSON.stringify(content));

    logger.info('Liara.json updated with remove account');

    return await readLiaraJson();
  } catch (error) {
    logger.error(error);
    return [];
  }
};
