const { writeFile, readJSON } = require('fs-extra');

const logger = require('../configs/logger');
const { envConfig } = require('../configs/envConfig');
const existsLiaraAuthJson = require('../utils/check-global-config');

exports.readLiaraJson = async () => {
  try {
    if (!(await existsLiaraAuthJson())) {
      return [];
    }

    const accounts = [];
    const content =
      (await readJSON(envConfig.NEW_GLOBAL_CONFIG_PATH, { throws: false })) || {};

    console.log(content);
    console.log(Object.values(content.accounts).length);
    if (!content.accounts || !Object.values(content.accounts).length) {
      return [];
    }

    let hasCurrent = false;

    for (const account of Object.keys(content.accounts)) {
      if (content.accounts[account].current === true) {
        hasCurrent = true;
      }

      accounts.push({ [account]: content.accounts[account] });
    }

    if (!hasCurrent) {
      accounts[0][Object.keys(accounts[0])].current = true;
    }

    await writeFile(envConfig.NEW_GLOBAL_CONFIG_PATH, JSON.stringify(content));

    return accounts;
  } catch (error) {
    logger.error(error);

    if (error.message === 'TIMEOUT') {
      logger.error('Get user data time out. It took about 10 seconds');

      return [];
    }

    logger.error('Not Found: .liara-auth.json');

    return [];
  }
};
