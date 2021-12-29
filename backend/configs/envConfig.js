const os = require("os");
const path = require("path");

exports.envConfig = {
  DSN: "https://741a1b1949d749558159bfc1b7e95878@sentry.liara.ir/15",
  LIARA_LOGIN_PAGE: "https://console.liara.ir/login",
  LIARA_GET_ME: "https://api.iran.liara.ir/v1/me",
  GLOBAL_CONF_PATH: path.join(os.homedir(), ".liara.json"),
  OPEN_PORT: undefined,
  PLATFORM: process.platform,
  IS_DEV: process.env.NODE_ENV === "development" ? true : false,
};
