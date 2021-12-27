const { readFile, writeFile } = require("fs/promises");

const { envConfig } = require("../configs/envConfig");
const { GLOBAL_CONF_PATH } = require("./account.management");

exports.updateLiaraJson = async (newContent) => {
  try {
    const content =
      JSON.parse(await readFile(envConfig.GLOBAL_CONF_PATH)) || {};

    const newContent = Object.assign(content, newContent);
    await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(newContent));
    return newContent;
  } catch (error) {
    return {};
  }
};
