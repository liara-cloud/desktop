const { readFile, writeFile } = require("fs/promises");

const { envConfig } = require("../configs/envConfig");
const logger = require("../configs/logger");

const mergeContent = async (content, data) => {
  // convert token to api_token
  data.map((obj) => {
    obj["api_token"] = obj.token;
    delete obj.token;
    return obj;
  });

  const fixData = data.reduce(function (target, key, index) {
    const accountName = `${key.email.split("@")[0]}_${key.region}`;
    target[accountName] = key;
    if (key.current == true) {
      content.current = accountName;
      content.api_token = key.api_token;
      content.region = key.region;
    }
    return target;
  }, {});
  const newContent = Object.assign(content, { accounts: fixData });
  await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(newContent));
  logger.info("Liara.json updated with new credentials");
  return newContent;
};

exports.updateLiaraJson = async (data) => {
  try {
    const content = JSON.parse(await readFile(envConfig.GLOBAL_CONF_PATH));
    return await mergeContent(content, data);
  } catch (error) {
    console.log(error);
    return await mergeContent({}, data);
  }
};
