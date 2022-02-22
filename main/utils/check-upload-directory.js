const path = require('path');
const logger = require('../configs/logger');
const { lstat, readFile, readdir } = require('fs-extra');
const { default: detectPlatform } = require("@liara/cli/lib/utils/detect-platform.js");

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

    const liaraJsonPath = path.join(userPath, 'liara.json');
    const hasLiaraJsonFile = await readFile(liaraJsonPath);
    const config = JSON.parse(hasLiaraJsonFile);
    config.platform = config.platform || detectPlatform(userPath)
    return { isDirectory, config, isEmpty: false };
  } catch (error) {
    if (!isDirectory && error.code === 'ENOENT') {
      return { isDirectory: false };
    }
    if (isDirectory && (error.code === 'ENOENT' || error.message === 'Unexpected end of JSON input')) {
      return { isDirectory, config: { platform: detectPlatform(userPath)}, isEmpty: false };
    }
    logger.error(error);
    return false;
  }
};

// this.checkDirectory('/Users/vashian/Documents/Docker-Projects/simpleweb').then(
//   console.log
// );
