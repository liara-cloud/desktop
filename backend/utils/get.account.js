const { default: axios } = require("axios");

const baseUrl = "https://api.iran.liara.ir/v1/me";
exports.getUser = async (apiToken) => {
  const response = await axios.get(baseUrl, {
    headers: { Authorization: `Bearer ${apiToken}` },
  });

  return response.data.user;
};
