const fs = require('fs-extra');
const { envConfig } = require('../configs/envConfig');
const logger = require('../configs/logger');
const { getProjects } = require('./list-projects');

async function liaraCache() {
  let liaraAuthJson;

  const liaraCache = {};

  const liaraCachePath = envConfig.GLOBAL_CACHE_PATH;

  try {
    liaraAuthJson =
      ((await fs.pathExists(envConfig.NEW_GLOBAL_CONFIG_PATH)) &&
        (await fs.readJSON(envConfig.NEW_GLOBAL_CONFIG_PATH, {
          throws: false,
        }))) ||
      {};

    if (!liaraAuthJson.accounts) {
      liaraAuthJson =
        ((await fs.pathExists(envConfig.GLOBAL_CONF_PATH)) &&
          (await fs.readJSON(envConfig.GLOBAL_CONF_PATH, { throws: false }))) ||
        {};
    }

    const liaraCacheJson =
      ((await fs.pathExists(liaraCachePath)) &&
        (await fs.readJson(liaraCachePath, { throws: false }))) ||
      {};

    if (
      !liaraAuthJson ||
      !liaraAuthJson.accounts ||
      liaraAuthJson[liaraAuthJson.current]
    ) {
      await fs.writeJSON(liaraCachePath, liaraCache);

      return liaraCache;
    }

    const region = liaraAuthJson.accounts[liaraAuthJson.current].region;
    const apiToken = liaraAuthJson.accounts[liaraAuthJson.current].api_token;
    const current = liaraAuthJson.current;

    for (const [account_name, configs] of Object.entries(liaraCacheJson)) {
      const path = Object.keys(configs)[0];
      const app = configs[path].app;
      // const port = configs[path].port;
      // const platform = configs[path].platform;

      if (!apiToken || !region) {
        continue;
      }

      const userProjects = (await getProjects(apiToken, region)).map(
        (project) => {
          return project.project_id;
        }
      );

      if (!userProjects.length) {
        continue;
      }

      if (!userProjects.includes(app)) {
        continue;
      }

      liaraCache[account_name] = { [path]: configs[path] };
    }

    Object.keys(liaraCache).length &&
      (await fs.writeJSON(
        liaraCachePath,
        Object.assign(liaraCacheJson, liaraCache)
      ));

    return liaraCache[current] || {};
  } catch (error) {
    logger.error(error);
    await fs.writeJSON(liaraCachePath, liaraCache);
    return {};
  }
}

module.exports = liaraCache;
