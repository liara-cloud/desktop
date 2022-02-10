const logger = require('../configs/logger');
const { readFile, writeFile } = require('fs-extra');
const { envConfig } = require('../configs/envConfig');

const mergeContent = async (content, accounts) => {
  logger.info('Start merge new account from console');
  const newAccounts = accounts.map((account) => {
    const accountName = `${account.email.split('@')[0]}_${account.region}`;
    account['api_token'] = account.token;
    delete account.token;
    return { [accountName]: account };
  });
  
  logger.info('Merge Accounts');
  Object.assign(content.accounts, ...newAccounts);
  const keys = Object.keys(content.accounts);

  for (let i = 0; i < keys.length; i++) {
    content.accounts[keys[i]].current = false;
    for (let j = i + 1; j < keys.length; j++) {
      if (
        content.accounts[keys[i]].email === content.accounts[keys[j]].email &&
        content.accounts[keys[i]].region === content.accounts[keys[j]].region
      ) {
        delete content.accounts[keys[i]];
        break;
      }
    }
  }

  logger.info('Change current account from console');
  const [account] = Object.entries(newAccounts[newAccounts.length - 1]);
  content.current = account[0];
  content.accounts[account[0]].current = true;
  await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(content));
  const result = Object.entries(content.accounts).map(([key, value]) => {
    return { [key]: value };
  });
  logger.info('finish merge account from console');
  return result;
};

exports.updateLiaraJson = async (data) => {
  try {
    const content = JSON.parse(await readFile(envConfig.GLOBAL_CONF_PATH));
    return await mergeContent(content, data);
  } catch (error) {
    return await mergeContent({ accounts: {} }, data);
  }
};

const test = [
  {
    fullname: '╪╣┘ä█î ┘é┘ä█î',
    region: 'iran',
    avatar: '//www.gravatar.com/avatar/09e040dc8d02631fc9974006e5c1504a?d=mp',
    email: 'aligholi8220@gmail.com',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWEyOGU4ZDQyMGU0NTAwMTFhM2EyNTYiLCJpYXQiOjE2NDM2MzU0MjR9.U3Wr5IdZQ6gSH2cMSaLaqYRABgIQiL5iZx2s7815VK8',
    current: true,
  },
  {
    fullname: '╪╣┘ä█î ┘é┘ä█î',
    region: 'iran',
    avatar: '//www.gravatar.com/avatar/513da49199401e17ecc4f0f78fe6ec9a?d=mp',
    email: 'amiraligholi8220@gmail.com',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWNhZGRlODljOGRmZTM0OGU0OWYzNmQiLCJpYXQiOjE2NDQyMjEzNzR9.o0PhdJgVFnEu-UkzI-fk4WSKTRfcSm1ur5t-SGBWTso',
    current: false,
  },
  {
    avatar: '//www.gravatar.com/avatar/9b78916ebd5b2a6ef407de924ee5ec97?d=mp',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MjAwZDNmZTA4N2RiZDFkYzFmYjlmOTYiLCJpYXQiOjE2NDQyMjE0Mzh9.ik94K2Jer_FdIgO6HkTxFimL0UocLfFR-r6Zdaq9Bf8',
    email: 'test-test-test@gmail.com',
    region: 'iran',
    fullname: '╪╣┘ä█î ┘é┘ä█î ┘ç╪│╪¬┘à',
    current: true,
  },
];
// this.updateLiaraJson(test).then(console.log);
// const newAccounts = [];
// let alreadyExist = false;
// for (const account of accounts) {
//   // convert token to api_token
//   account['api_token'] = account.token;
//   delete account.token;

//   const accountName = `${account.email.split('@')[0]}_${account.region}`;
//   if (content.accounts && Object.keys(content.accounts).length) {
//     for (const [key, value] of Object.entries(content.accounts)) {
//       content.accounts[key]['current'] = false;
//       if (value.email === account.email && value.region === account.region) {
//         alreadyExist = true;
//       }
//     }
//   }
//   if (!alreadyExist) {
//     newAccounts.push({ [accountName]: account });
//   }
//   alreadyExist = false;
// }
// const contents = Object.assign(content.accounts, ...newAccounts);
// console.log(content);
// // // console.log(newAccounts);
// await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(content));
// return content.accounts;
// const accounts = data.map((account) => {
//   const accountName = `${account.email.split('@')[0]}_${account.region}`;
//   account['api_token'] = account.token;
//   delete account.token;
//   // console.log(Object.values(content.accounts));

//   Object.values(content.accounts).find((liaraJsonAccount) => {
//     if (
//       liaraJsonAccount.email === account.email &&
//       liaraJsonAccount.region === account.region
//     ) {
//       return {};
//     }
//   });
//   return { [accountName]: account };
// });

// accounts.map();

// const fixData = accounts.reduce(function (target, key) {
//   console.log(target, key);
//   const accountName = `${key.email.split('@')[0]}_${key.region}`;
//   target[accountName] = key;
//   if (key.current == true) {
//     content.current = accountName;
//     content.api_token = key.api_token;
//     content.region = key.region;
//   }
//   return target;
// }, {});
// console.log(accounts);
// let newContent;
// if (content.accounts && Object.entries(content.accounts) !== 0) {
//   newContent = Object.assign(content, {
//     accounts: Object.assign(content.accounts, fixData),
//   });
// } else {
//   newContent = Object.assign(content, { accounts: fixData });
// }
// await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(newContent));
// logger.info('Liara.json updated with new credentials');
// return newContent;
