const { default: got } = require('got');

const { envConfig } = require('../configs/envConfig');

module.exports = (api_token, region) => {
  console.log(envConfig.APP_VERSION);
  const config = {
    headers: {
      Authorization: `Bearer ${api_token}`,
      'User-Agent': `Desktop/${envConfig.APP_VERSION} (${envConfig.PLATFORM}-${envConfig.ARCH})`,
    },
    prefixUrl: envConfig.REGION_API_URL[region],
  };

  return got.extend(config);
};
