const { default: axios } = require("axios");

const { envConfig } = require("../configs/envConfig");

exports.getUser = async (apiToken) => {
  const response = await axios.get(envConfig.LIARA_GET_ME, {
    headers: { Authorization: `Bearer ${apiToken}` },
  });
  return response.data.user;
};
