const {default: got} = require('got');

const {envConfig} = require('../configs/envConfig');

module.exports = (api_token, region) => {
  const config = {
    headers: {
      Authorization: `Bearer ${api_token}`,
    },
    prefixUrl: envConfig.REGIO_API_URL[region],
  };

  return got.extend(config);
};

