const Raven = require("raven");
const pkg = require('../../package.json');

exports.sentry = Raven.config(
  "https://741a1b1949d749558159bfc1b7e95878@sentry.liara.ir/15"
, {
  release: pkg.version,
}).install();
