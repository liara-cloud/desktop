const os = require('os');
const path = require('path');

exports.envConfig = {
  DEV: {
    LIARA_LOGIN_PAGE: 'http://localhost:3000/login',
    LIARA_REGISTER_PAGE: 'http://localhost:3000/register',
  },
  REGION_DEPLOY_APP: {
    germany: 'https://api.liara.run',
    iran: 'https://api.iran.liara.run',
  },
  REGION_API_URL: {
    germany: 'https://api.liara.ir',
    iran: 'https://api.iran.liara.ir',
  },
  MAX_SOURCE_SIZE: 200 * 1024 * 1024, // 200 MB
  LIARA_GET_ME_GERMANY: 'http://api.liara.ir/v1/me',
  LIARA_LOGIN_PAGE: 'https://console.liara.ir/login',
  LIARA_GET_ME_IRAN: 'http://api.iran.liara.ir/v1/me',
  LIARA_REGISTER_PAGE: 'https://console.liara.ir/register',
  LIARA_TICKET_PAGE: 'https://console.liara.ir/tickets/create',
  DSN: 'https://741a1b1949d749558159bfc1b7e95878@sentry.liara.ir/15',

  ARCH: process.arch,
  PLATFORM: process.platform,
  OPEN_PORT: undefined,
  APP_VERSION: undefined,
  CHECK_API_TOKEN: false,
  GLOBAL_CONF_PATH: path.join(os.homedir(), '.liara.json'),
  GLOBAL_CACHE_PATH: path.join(os.homedir(), '.liara-cache.json'),
  NEW_GLOBAL_CONFIG_PATH: path.join(os.homedir(), '.liara-auth.json'),
  IS_DEV: process.env.NODE_ENV === 'development' ? true : false,
};
