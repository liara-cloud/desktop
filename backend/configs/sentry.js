const { init } = require("@sentry/electron");

const { envConfig } = require("./envConfig");

exports.sentry = () => {
  init({ dsn: envConfig.DSN });
};
