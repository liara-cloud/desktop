const os = require('os');
const path = require('path');

exports.envConfig = {
  REGION_DEPLOY_APP: {
    germany: 'https://api.liara.run',
    iran: 'https://api.iran.liara.run',
  },
  REGION_API_URL: {
    germany: 'https://api.liara.ir',
    iran: 'https://api.iran.liara.ir',
  },
  MAX_SOURCE_SIZE: 200 * 1024 * 1024, // 200 MB
  LIARA_LOGIN_PAGE: 'http://localhost:3001/login',
  LIARA_GET_ME_GERMANY: 'http://api.liara.ir/v1/me',
  LIARA_GET_ME_IRAN: 'http://api.iran.liara.ir/v1/me',
  LIARA_REGISTER_PAGE: 'http://localhost:3001/register',
  LIARA_TICKET_PAGE: 'https://console.liara.ir/tickets/create',
  DSN: 'https://741a1b1949d749558159bfc1b7e95878@sentry.liara.ir/15',
  LIARA_LOG_PAGE: 'https://console.liara.ir/apps/{app-placeholder}/logs',

  ARCH: process.arch,
  PLATFORM: process.platform,
  OPEN_PORT: undefined,
  APP_VERSION: undefined,
  GLOBAL_CONF_PATH: path.join(os.homedir(), '.liara.json'),
  IS_DEV: process.env.NODE_ENV === 'development' ? true : false,
};
