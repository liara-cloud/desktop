const path = require('path');
const logger = require('../configs/logger');
const { lstat, readFile, readdir } = require('fs-extra');

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
    const config = JSON.parse(hasLiaraJsonFile) || {};
    return { isDirectory, config, isEmpty: false };
  } catch (error) {
    if (!isDirectory && error.code === 'ENOENT') {
      return { isDirectory: false };
    }
    if (isDirectory && (error.code === 'ENOENT' || error.message === 'Unexpected end of JSON input')) {
      return { isDirectory, config: {}, isEmpty: false };
    }
    logger.error(error);
    return false;
  }
};