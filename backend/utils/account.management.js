const { readFile, writeFile } = require("fs/promises");

const { getUser } = require("./get.account");
const { envConfig } = require("../configs/envConfig");
const logger = require("../configs/logger");

exports.readLiaraJson = async () => {
  try {
    const content =
      JSON.parse(await readFile(envConfig.GLOBAL_CONF_PATH)) || {};

    const contentKeys = Object.keys(content);
    if (
      (!contentKeys.includes("accounts") ||
        Object.keys(content.accounts).length == 0) &&
      contentKeys.includes("api_token") &&
      contentKeys.includes("region")
    ) {
      const user = await getUser(content.api_token);
      const account = {};
      const accountName = `${user.email.split("@")[0]}_${content.region}`;
      account[accountName] = {};
      account[accountName]["fullname"] = user.fullname;
      account[accountName]["email"] = user.email;
      account[accountName]["avatar"] = user.avatar;
      account[accountName]["region"] = content.region;
      account[accountName]["api_token"] = content.api_token;
      account[accountName]["current"] = true;
      delete content.current;
      content["accounts"] = account;
      await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(content));
      return content;
    }
    if (Object.keys(content.accounts).length !== 0) {
      for (const [key, value] of Object.entries(content.accounts)) {
        const user = await getUser(value.api_token);
        const accountName = `${user.email.split("@")[0]}_${
          content.accounts[key]["region"]
        }`;
        content.accounts[key]["fullname"] = user.fullname;
        content.accounts[key]["avatar"] = user.avatar;

        if (!content.accounts[key]["current"]) {
          content.accounts[key]["current"] = false;
          if (content.current == key) {
            content.accounts[key]["current"] = true;
          }
        }
        content.accounts[accountName] = content.accounts[key];
        delete content.accounts[key];
      }
      let hasCurrent = false;
      for (const [key, value] of Object.entries(content.accounts)) {
        if (value.current) {
          hasCurrent = true;
        }
      }
      if (!hasCurrent) {
        Object.values(content.accounts)[0].current = true;
      }
      await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(content));
      return {
        accounts: content.accounts,
      };
    }
    return {};
  } catch (error) {
    logger.error("Not Found: .liara.json");
    return {};
  }
};
