const logger = require('../configs/logger');
const { readFile, writeFile } = require('fs-extra');
const { envConfig } = require('../configs/envConfig');
const { readLiaraJson } = require('./account-management');

exports.removeAccount = async (email, region) => {
  try {
    logger.info('Start to remove account');
    let content = JSON.parse(await readFile(envConfig.GLOBAL_CONF_PATH)) || {};

    Object.entries(content.accounts).map(([key, value]) => {
      if (value.email === email && value.region === region) {
        delete content.accounts[key];
        content.current = content.current === key ? null : content.current;
      }
    });
    if (!Object.values(content.accounts).length) {
      content = {};
    }
    await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(content));
    logger.info('Liara.json updated with remove account');
    return await readLiaraJson();
  } catch (error) {
    logger.error(error);
    return {};
  }
};

// this.removeAccount('mohammadrezavashianofficial@gmail.com', 'iran');
// if (Object.keys(content.accounts).length === 1 && ) {

//   content = {};
// }
// console.log(content);
// if (content.accounts && Object.keys(content.accounts).length !== 0) {
//   for (const [key, value] of Object.entries(content.accounts)) {
//     if (value.email == email && value.region == region) {
//       delete content.accounts[key];
//       if (content.current == key) {
//         content.current = null;
//       }
//       if (Object.values(content.accounts).length !== 0) {
//         Object.values(content.accounts)[0].current = true;
//         content.current = Object.keys(content.accounts)[0];
//         content.api_token = Object.values(content.accounts)[0]['api_token'];
//       }
//       if (Object.values(content.accounts).length == 0) {
//         content = { accounts: {} };
//       }
//     }
//   }
// }
