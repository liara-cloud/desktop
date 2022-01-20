const { lstat } = require('fs/promises');

const logger = require('../configs/logger');

exports.isDirecoty = async (path) => {
  try {
    return (await lstat(path)).isDirectory();
  } catch (error) {
    logger.error(error);
    return false;
  }
};
