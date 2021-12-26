const os = require("os");
const path = require("path");
const { readFileSync } = require("fs");

const { getUser } = require("./get.account");

exports.GLOBAL_CONF_PATH = path.join(os.homedir(), ".liara.json");

exports.readLiaraJson = async () => {
  try {
    const content =
      JSON.parse(readFileSync(this.GLOBAL_CONF_PATH).toString("utf-8")) || {};
    const contentKeys = Object.keys(content);
    if (
      !contentKeys.includes("accounts") &&
      contentKeys.includes("api_token") &&
      contentKeys.includes("region")
    ) {
      const user = await getUser(content.api_token);
      content["fullname"] = user.fullname;
      content["email"] = user.email;
      content["avatar"] = user.avatar;
      delete content.current;
      return content;
    }
    if (Object.keys(content.accounts).length !== 0) {
      for (const [key, value] of Object.entries(content.accounts)) {
        const user = await getUser(value.api_token);
        content.accounts[key]["fullname"] = user.fullname;
        content.accounts[key]["avatar"] = user.avatar;
      }
      return {
        accounts: content.accounts,
        current: content.current,
      };
    }
  } catch (error) {
    return {};
  }
};
