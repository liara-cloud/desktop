const fs = require('fs-extra');
const {envConfig} = require("../configs/envConfig")
const {getProjects} = require("./list-projects")

async function liaraCache () {

  const liaraCache = {};

  const liaraCachePath = envConfig.GLOBAL_CACHE_PATH

  try {
    const liaraCacheJson = await fs.pathExists(liaraCachePath) && await fs.readJson(liaraCachePath);

    for (const [path, configs] of Object.entries(liaraCacheJson)) {

      if (!configs.token || !configs.region) {
        continue;
      }

      const userProjects = (await getProjects(configs.token, configs.region)).map(project => {
        return project.project_id
      });

      if (!userProjects.length) {
        continue;
      }

      if (!userProjects.includes(configs.app)) {
        continue;
      }

      liaraCache[path] = configs;
    }

    await fs.writeJSON(liaraCachePath, liaraCache);

    return liaraCache;
  } catch (error) {
    await fs.writeJSON(liaraCachePath, liaraCache);
    return {}
  }

}

module.exports = liaraCache