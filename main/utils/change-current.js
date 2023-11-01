const { writeFile, readJSON } = require('fs-extra');

const logger = require('../configs/logger');
const existsLiaraAuthJson = require('./check-global-config');
const {
  envConfig: { NEW_GLOBAL_CONFIG_PATH },
} = require('../configs/envConfig');

exports.chanegCurrentAccount = async (email, region) => {
  try {
    logger.info('Start to change Current account');
    const globalConf = await existsLiaraAuthJson();

    if (!globalConf) return [];

    const content =
      (await readJSON(NEW_GLOBAL_CONFIG_PATH, {
        throws: false,
      })) || {};

    let changeOne = true;

    const accounts = Object.entries(content.accounts).map(([key, value]) => {
      value.current = false;

      if (value.email === email && value.region === region && changeOne) {
        value.current = true;

        changeOne = false;
      }
      return { [key]: value };
    });

    await writeFile(NEW_GLOBAL_CONFIG_PATH, JSON.stringify(content));

    logger.info('Liara.json updated with new current');

    return accounts;
  } catch (error) {
    logger.error(error);
    return [];
  }
};
