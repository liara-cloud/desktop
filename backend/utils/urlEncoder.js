const { envConfig } = require("../configs/envConfig");

exports.createEncodedUrl = (port) => {
  const query = `desktop=v1&callbackURL=localhost:${port}/callback`;
  return `${envConfig.LIARA_LOGIN_PAGE}?${Buffer.from(query).toString(
    "base64"
  )}`;
};
