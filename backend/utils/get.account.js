const { default: axios } = require("axios");

const { envConfig } = require("../configs/envConfig");
const logger = require("../configs/logger");

exports.getUser = async (apiToken, region) => {
  try {
    logger.info("Start to get user data");
    const response = await axios.get(
      region === "iran"
        ? envConfig.LIARA_GET_ME_IRAN
        : envConfig.LIARA_GET_ME_GERMANY,
      {
        headers: { Authorization: `Bearer ${apiToken}` },
      }
    );
    logger.info(`Get User Data: ${response.data.user}`);
    return response.data.user;
  } catch (error) {
    logger.info(error);
    return {};
  }
};
