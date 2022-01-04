const { readFile } = require("fs/promises");

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
      const account = { account_0: {} };
      account.account_0["fullname"] = user.fullname;
      account.account_0["email"] = user.email;
      account.account_0["avatar"] = user.avatar;
      account.account_0["region"] = content.region;
      account.account_0["api_token"] = content.api_token;
      account.account_0["current"] = true;
      delete content.current;
      content["accounts"] = account;
      return content;
    }
    if (Object.keys(content.accounts).length !== 0) {
      for (const [key, value] of Object.entries(content.accounts)) {
        const user = await getUser(value.api_token);
        content.accounts[key]["fullname"] = user.fullname;
        content.accounts[key]["avatar"] = user.avatar;

        if (!content.accounts[key]["current"]) {
          content.accounts[key]["current"] = false;
          if (content.current == key) {
            content.accounts[key]["current"] = true;
          }
        }
      }
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
