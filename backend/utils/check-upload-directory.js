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
    if (isEmpty.length) {
      return { isDirectory: false };
    }

    const liaraJsonPath = path.join(userPath, 'liara.json');
    const hasLiaraJsonFile = await readFile(liaraJsonPath);
    const config = JSON.parse(hasLiaraJsonFile);

    return { isDirectory, config };
  } catch (error) {
    if (!isDirectory && error.code === 'ENOENT') {
      return { isDirectory: false };
    }
    if (isDirectory && error.code === 'ENOENT') {
      return { isDirectory, config: false };
    }
    logger.error(error);
    return false;
  }
};

// this.checkDirectory('/Users/vashian/Documents/Docker-Projects/simpleweb').then(
//   console.log
// );
