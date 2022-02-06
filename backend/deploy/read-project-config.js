const path = require('path')
const fs = require('fs-extra');
const logger = require('../configs/logger');

const readProjectConfig = (projectPath) => {
  let content;
  const liaraJsonPath = path.join(projectPath, 'liara.json');
  const hasLiaraJsonFile = fs.existsSync(liaraJsonPath)
  if (hasLiaraJsonFile) {
    try {
      content = fs.readJSONSync(liaraJsonPath) || {};
    } catch {
      const message = 'Syntax error in `liara.json`!';
      logger.error(message)
      throw new Error(message)
    }
  }
  return content || {};
}

module.exports = readProjectConfig