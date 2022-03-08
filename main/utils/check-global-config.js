const fs = require('fs-extra')
const logger = require('../configs/logger')
const {envConfig} = require('../configs/envConfig')

module.exports = async () => {
  try { 
    const existsLiaraAuthJson = await fs.pathExists(envConfig.NEW_GLOBAL_CONFIG_PATH)
    if (existsLiaraAuthJson) {
      return true
    }
    return false
  } catch (error) {
    logger.error(error)
    return false
  }
}