const logger = require('../configs/logger');
const { getUser } = require('./get-account');
const { envConfig } = require('../configs/envConfig');
const { writeFile, readJSON } = require('fs-extra');
const existsLiaraAuthJson = require('../utils/check-global-config');

exports.readLiaraJson = async () => {
  let content;
  try {
    if (await existsLiaraAuthJson()) {
      const accounts = [];
      content =
        (await readJSON(envConfig.NEW_GLOBAL_CONFIG_PATH, { throws: false })) ||
        {};
      if (content.accounts) {
        let hasCurrent = false;
        for (const account of Object.keys(content.accounts)) {
          if (content.accounts[account].current === true) {
            hasCurrent = true;
          }
          //TODO check api token for each account for the first time
          accounts.push({ [account]: content.accounts[account] });
        }

        if (!hasCurrent) {
          accounts[0][Object.keys(accounts[0])].current = true;
        }
        await writeFile(
          envConfig.NEW_GLOBAL_CONFIG_PATH,
          JSON.stringify(content)
        );
        return accounts;
      }
      return [];
    }
    content =
      (await readJSON(envConfig.GLOBAL_CONF_PATH, { throws: false })) || {};
    if (
      content.region &&
      content.api_token &&
      (!content.accounts || !Object.keys(content.accounts).length)
    ) {
      const user = await getUser(content.api_token, content.region);
      const accountName = `${user.email.split('@')[0]}_${content.region}`;
      const account = {
        [accountName]: {
          email: user.email,
          avatar: user.avatar,
          region: content.region,
          fullname: user.fullname,
          api_token: content.api_token,
          current: true,
        },
      };
      content.accounts = account;
      content.current = accountName;
      await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(content));
      return [account];
    }
    if (Object.keys(content.accounts).length) {
      const accounts = Object.entries(content.accounts).map(
        async ([key, value]) => {
          let user;
          if (
            !value.avatar ||
            !value.fullname ||
            !value.email ||
            !envConfig.CHECK_API_TOKEN
          ) {
            user = await getUser(value.api_token, value.region);
          }
          if (content.current) {
            value.current = false;
            if (content.current === key) {
              value.current = true;
              content.api_token = value.api_token;
              content.region = value.region;
            }
          }
          if (!content.current) {
            value.current = true;
            content.current = key;
            content.api_token = value.api_token;
            content.region = value.region;
          }

          const account = {
            [key]: {
              email: user ? user.email : value.email,
              avatar: user ? user.avatar : value.avatar,
              region: value.region,
              current: value.current,
              fullname: user ? user.fullname : value.fullname,
              api_token: value.api_token,
            },
          };

          content.accounts[key] = account[key];
          return account;
        }
      );
      const result = await Promise.all(accounts);
      await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(content));
      return result;
    }
    return [];
  } catch (error) {
    logger.error(error);
    if (error.message.startsWith('{"apiToken')) {
      content.accounts &&
        Object.keys(content.accounts).map(async (account) => {
          if (
            content.accounts[account].api_token ===
              JSON.parse(error.message).apiToken &&
            content.accounts[account].region === JSON.parse(error.message).region
          ) {
            content.current =
              content.current === account ? null : content.current;
            delete content.accounts[account];
          }
        });
      if (
        content.api_token === JSON.parse(error.message).apiToken &&
        content.region === JSON.parse(error.message).region
      ) {
        delete content.api_token;
        delete content.region;
      }
      await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(content));
      return await this.readLiaraJson();
    }
    if (error.message === 'TIMEOUT') {
      logger.error('Get user data time out. It took about 10 seconds');
      return [];
    }
    logger.error('Not Found: .liara.json');
    return [];
  }
};
