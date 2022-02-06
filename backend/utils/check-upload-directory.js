const path = require('path');
const { lstat, readFile} = require('fs/promises');

const logger = require('../configs/logger');

exports.isDirecoty = async (userPath) => {
  let isDirectory;
  try {
    isDirectory = (await lstat(userPath)).isDirectory()
    if (!isDirectory) {
      return {isDirectory}
    }
    
    const liaraJsonPath = path.join(userPath, 'liara.json');
    const hasLiaraJsonFile = await readFile(liaraJsonPath);
    const config = JSON.parse(hasLiaraJsonFile)

    return {isDirectory, config}
  } catch (error) {
    if (!isDirectory && error.code === 'ENOENT') {
      return {isDirecoty: false}
    }
    if (isDirectory && error.code === 'ENOENT') {
      return {isDirectory, config: false}
    }
    console.log(error)
    logger.error(error);
    return false;
  }
};