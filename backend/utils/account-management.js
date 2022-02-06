const { readFile } = require('fs-extra');
const logger = require('../configs/logger');
const { getUser } = require('./get-account');
const { envConfig } = require('../configs/envConfig');

exports.readLiaraJson = async () => {
  try {
    const content =
      JSON.parse(await readFile(envConfig.GLOBAL_CONF_PATH)) || {};

    if (
      content.region &&
      content.api_token &&
      (!content.accounts || !Object.keys(content.accounts).length)
    ) {
      const user = await getUser(content.api_token, content.region);
      const accountName = `${user.email.split('@')[0]}_${content.region}`;
      return [
        {
          [accountName]: {
            email: user.email,
            avatar: user.avatar,
            region: content.region,
            fullname: user.fullname,
            api_token: content.api_token,
            current: true,
          },
        },
      ];
    }
    if (Object.keys(content.accounts).length) {
      let hasCurrent = Object.keys(content.accounts).find(
        (key) => key === content.current
      );

      const accounts = Object.entries(content.accounts).map(
        async ([key, value]) => {
          const user = await getUser(value.api_token, value.region);
          if (hasCurrent) {
            value.current = hasCurrent === key ? true : false;
          }
          if (!hasCurrent) {
            value.current = true;
            hasCurrent = key;
          }
          return {
            [key]: {
              email: user.email,
              avatar: user.avatar,
              region: content.region,
              current: value.current,
              fullname: user.fullname,
              api_token: value.api_token,
            },
          };
        }
      );

      return await Promise.all(accounts);
    }
    return {};
  } catch (error) {
    logger.error('Not Found: .liara.json');
    return {};
  }
};

// const contentKeys = Object.keys(content);
// if (
//   (!contentKeys.includes('accounts') ||
//     Object.keys(content.accounts).length == 0) &&
//   contentKeys.includes('api_token') &&
//   contentKeys.includes('region')
// )

// account[accountName] = {};
// account[accountName]['fullname'] = user.fullname;
// account[accountName]['email'] = user.email;
// account[accountName]['avatar'] = user.avatar;
// account[accountName]['region'] = content.region;
// account[accountName]['api_token'] = content.api_token;
// account[accountName]['current'] = true;
// content.current = accountName;
// content['accounts'] = account;
// await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(content));

// for (const [key, value] of Object.entries(content.accounts)) {
//   console.log(key);
//   console.log(value);
//   const user = await getUser(value.api_token, value.region);
//   const accountName = `${user.email.split('@')[0]}_${value.region}`;
//   value.fullname = user.fullname;
//   value.avatar = user.avatar;
//   value.current = content.current === key ? true : false;

//   hasCurrent && hasCurrent === key ? true : (hasCurrent = key);

//   if (hasCurrent) {
//     value.current = hasCurrent === key ? true : false;
//   }
//   if (!hasCurrent) {
//     value.current = true;
//     hasCurrent = key;
//   }
//   // if (hasCurrent && content.current === key) {
//   //   value.current = true;
//   // }
//   // content.accounts[key]['fullname'] = user.fullname;
//   // content.accounts[key]['avatar'] = user.avatar;
//   // if (!value.current) {
//   //   value.current = false;
//   // }
//   // if (content.current === key) {
//   //   value.current = true;
//   // }
//   // if (!content.accounts[key]['current']) {
//   //   content.accounts[key]['current'] = false;
//   //   if (content.current == key) {
//   //     content.accounts[key]['current'] = true;
//   //     content.current = accountName;
//   //     content.api_token = user.api_token;
//   //   }
//   // }
//   // content.accounts[accountName] = content.accounts[key];
//   // if (key !== accountName) {
//   //   delete content.accounts[key];
//   // }
// }
// let hasCurrent = false;
// for (const [key, value] of Object.entries(content.accounts)) {
//   if (value.current) {
//     hasCurrent = true;
//   }
// }
// if (!hasCurrent) {
//   Object.values(content.accounts)[0].current = true;
// }
// return {
//   accounts: content.accounts,
// };
