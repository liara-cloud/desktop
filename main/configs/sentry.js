const Raven = require("raven");

exports.sentry = Raven.config(
  "https://741a1b1949d749558159bfc1b7e95878@sentry.liara.ir/15"
).install();
