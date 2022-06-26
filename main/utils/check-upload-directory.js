const path = require("path");
const logger = require("../configs/logger");
const { lstat, readFile, readdir, pathExists, readJson } = require("fs-extra");
const { envConfig } = require('../configs/envConfig');


exports.checkDirectory = async (userPath) => {
  let isDirectory;
  try {
    isDirectory = (await lstat(userPath)).isDirectory();
    if (!isDirectory) {
      return { isDirectory };
    }

    const isEmpty = await readdir(userPath);
    if (!isEmpty.length) {
      return { isDirectory: true, isEmpty: true };
    }

    const liaraJsonPath = path.join(userPath, "liara.json");
    const hasLiaraJsonFile = await pathExists(liaraJsonPath) && await readFile(liaraJsonPath);
    const liaraCachePath = envConfig.GLOBAL_CACHE_PATH;
    const hasLiaraCacheJson = await pathExists(liaraCachePath) && await readJson(liaraCachePath);
    const config = JSON.parse(hasLiaraJsonFile) || hasLiaraCacheJson[userPath] || {};
    return { isDirectory, config, isEmpty: false };
  } catch (error) {
    if (!isDirectory && error.code === "ENOENT") {
      return { isDirectory: false };
    }
    if (
      isDirectory &&
      (error.code === "ENOENT" ||
        error.message === "Unexpected end of JSON input" ||
        error.name === "SyntaxError")
    ) {
      return { isDirectory, config: {}, isEmpty: false };
    }
    logger.error(error);
    return false;
  }
};
