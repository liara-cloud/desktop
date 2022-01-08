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
      const user = await getUser(content.api_token, content.region);
      const account = {};
      const accountName = `${user.email.split("@")[0]}_${content.region}`;
      account[accountName] = {};
      account[accountName]["fullname"] = user.fullname;
      account[accountName]["email"] = user.email;
      account[accountName]["avatar"] = user.avatar;
      account[accountName]["region"] = content.region;
      account[accountName]["api_token"] = content.api_token;
      account[accountName]["current"] = true;
      content.current = accountName;
      content["accounts"] = account;
      await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(content));
      return content.accounts;
    }
    if (Object.keys(content.accounts).length !== 0) {
      for (const [key, value] of Object.entries(content.accounts)) {
        const user = await getUser(value.api_token, value.region);
        const accountName = `${user.email.split("@")[0]}_${
          content.accounts[key]["region"]
        }`;
        content.accounts[key]["fullname"] = user.fullname;
        content.accounts[key]["avatar"] = user.avatar;

        if (!content.accounts[key]["current"]) {
          content.accounts[key]["current"] = false;
          if (content.current == key) {
            content.accounts[key]["current"] = true;
            content.current = accountName;
            content.api_token = user.api_token;
          }
        }
        content.accounts[accountName] = content.accounts[key];
        if (key !== accountName) {
          delete content.accounts[key];
        }
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
