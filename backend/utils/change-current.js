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

// this.chanegCurrentAccount('mohammadrezavashianofficial@gmail.com', 'iran').then(console.log);


   // let OneCurrent = true;
    // const content =
    //   JSON.parse(await readFile(envConfig.GLOBAL_CONF_PATH)) || {};
    // if (content.accounts && Object.keys(content.accounts).length != 0) {
    //   for (const [key, value] of Object.entries(content.accounts)) {
    //     value.current = false;
    //     if (value.region == region && value.email == email && OneCurrent) {
    //       value.current = true;
    //       content.current = key;
    //       OneCurrent = false;
    //     }
    //     if (!value.fullname || !value.avatar) {
    //       const user = await getUser(value.api_token, value.region);
    //       value.fullname = user.fullname;
    //       value.avatar = user.avatar;
    //     }
    //   }
    // content.current = null;
    // }