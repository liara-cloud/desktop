const { default: axios } = require("axios");

const { envConfig } = require("../configs/envConfig");
const logger = require("../configs/logger");

exports.getUser = async (apiToken) => {
  logger.info("Start to get user data");
  const response = await axios.get(envConfig.LIARA_GET_ME, {
    headers: { Authorization: `Bearer ${apiToken}` },
  });
  logger.info(`Get User Data: ${response.data.user}`);
  return response.data.user;
};
