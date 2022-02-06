const logger = require('../configs/logger');
const { getUser } = require('./get-account');
const { readFile, writeFile } = require('fs-extra');
const { envConfig } = require('../configs/envConfig');

exports.chanegCurrentAccount = async (email, region) => {
  try {
    logger.info('Start to change Current account');
    let OneCurrent = true;
    const content =
      JSON.parse(await readFile(envConfig.GLOBAL_CONF_PATH)) || {};
    if (content.accounts && Object.keys(content.accounts).length != 0) {
      for (const [key, value] of Object.entries(content.accounts)) {
        value.current = false;
        if (value.region == region && value.email == email && OneCurrent) {
          value.current = true;
          content.current = key;
          OneCurrent = false;
        }
        if (!value.fullname || !value.avatar) {
          const user = await getUser(value.api_token, value.region);
          value.fullname = user.fullname;
          value.avatar = user.avatar;
        }
      }
      // content.current = null;
    }
    await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(content));
    logger.info('Liara.json updated with new current');
    return content;
  } catch (error) {
    console.log(error);
    logger.error(error);
    return {};
  }
};
