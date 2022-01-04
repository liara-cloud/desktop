const { readFile, writeFile } = require("fs/promises");

const { envConfig } = require("../configs/envConfig");
const logger = require("../configs/logger");

exports.removeAccount = async (email, region) => {
  try {
    logger.info("Start to remove account");
    let content = JSON.parse(await readFile(envConfig.GLOBAL_CONF_PATH)) || {};
    const contentKeys = Object.keys(content);
    if (
      (!contentKeys.includes("accounts") ||
        Object.keys(content.accounts).length == 0) &&
      contentKeys.includes("api_token") &&
      contentKeys.includes("region")
    ) {
      content = {};
    }
    if (Object.keys(content.accounts).length !== 0) {
      for (const [key, value] of Object.entries(content.accounts)) {
        if (value.email == email && value.region == region) {
          delete content.accounts[key];
          if (content.current == key) {
            content.current == null;
          }
        }
      }
    }
    await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(content));
    logger.info("Liara.json updated with remove account");
    return content;
  } catch (error) {
    console.log(error);
    logger.error(error);
    return {};
  }
};
