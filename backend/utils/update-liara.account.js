const { readFile, writeFile } = require("fs/promises");

const { envConfig } = require("../configs/envConfig");

const mergeContent = async (content, data) => {
  const newContent = Object.assign(content, data);
  await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(newContent));
  return newContent;
};

exports.updateLiaraJson = async (data) => {
  try {
    const content = JSON.parse(await readFile(envConfig.GLOBAL_CONF_PATH));
    return await mergeContent(content, data);
  } catch (error) {
    return await mergeContent({}, data);
  }
};
