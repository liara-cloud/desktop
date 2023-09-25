const path = require('path');
const logger = require('../configs/logger');
const liaraCache = require('./handle-cache');
const { lstat, readdir, pathExists, readJson } = require('fs-extra');

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

    const liaraJson =
      (await pathExists(liaraJsonPath)) && (await readJson(liaraJsonPath));

    const liaraCacheData = await liaraCache();

    return {
      isDirectory,
      config: { ...liaraCacheData?.[userPath], ...liaraJson },
      isEmpty: false,
    };
  } catch (error) {
    if (!isDirectory && error.code === 'ENOENT') {
      return { isDirectory: false };
    }

    if (
      isDirectory &&
      (error.code === 'ENOENT' ||
        error.message === 'Unexpected end of JSON input' ||
        error.name === 'SyntaxError')
    ) {
      return {
        isDirectory,
        config: {},
        isEmpty: false,
        liaraJsonSyntaxError: true,
      };
    }

    logger.error(error);

    return false;
  }
};
