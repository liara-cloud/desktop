const logger = require('../configs/logger');
const { writeFile, readJson } = require('fs-extra');
const existsLiaraAuthJson = require('./check-global-config');
const {
  envConfig: { NEW_GLOBAL_CONFIG_PATH },
} = require('../configs/envConfig');
const { readLiaraJson } = require('./account-management');

const mergeContent = async (content, accounts, globalConf) => {
  logger.info('Start merge new account from console');

  const newAccounts = accounts.map((account) => {
    const accountName = `${account.email.split('@')[0]}_${account.region}`;
    account['api_token'] = account.token;
    delete account.token;
    return { [accountName]: account };
  });

  logger.info('Merge Accounts');

  Object.assign(content.accounts, ...newAccounts);

  const keys = Object.keys(content.accounts);

  for (let i = 0; i < keys.length; i++) {
    content.accounts[keys[i]].current = false;
    for (let j = i + 1; j < keys.length; j++) {
      if (
        content.accounts[keys[i]].email === content.accounts[keys[j]].email &&
        content.accounts[keys[i]].region === content.accounts[keys[j]].region
      ) {
        delete content.accounts[keys[i]];
        break;
      }
    }
  }

  logger.info('Change current account from console');

  const [account] = Object.entries(newAccounts[newAccounts.length - 1]);

  content.accounts[account[0]].current = true;

  await writeFile(NEW_GLOBAL_CONFIG_PATH, JSON.stringify(content));

  const result = Object.entries(content.accounts).map(([key, value]) => {
    return { [key]: value };
  });

  logger.info('finish merge account from console');

  return result;
};

exports.updateLiaraJson = async (data) => {
  let globalConf;

  try {
    globalConf = await existsLiaraAuthJson();

    const content = (await readJson(NEW_GLOBAL_CONFIG_PATH)) || {};

    if (content && Object.keys(content).length === 0) {
      content.accounts = {};
    }
    if (data.length) {
      return await mergeContent(content, data, globalConf);
    }

    return readLiaraJson();
  } catch (error) {
    if (data.length) {
      return await mergeContent({ accounts: {} }, data, globalConf);
    }

    return readLiaraJson();
  }
};
