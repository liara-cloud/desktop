const { readFile } = require("fs/promises");

const { getUser } = require("./get.account");
const { envConfig } = require("../configs/envConfig");

exports.readLiaraJson = async () => {
  try {
    const content =
      JSON.parse(await readFile(envConfig.GLOBAL_CONF_PATH)) || {};

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
        current: Object.keys(content.accounts).includes(content.current)
          ? content.current
          : null,
      };
    }
    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
};
