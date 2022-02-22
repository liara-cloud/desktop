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
  content.api_token = account[1].api_token;
  content.region = account[1].region;
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
    if (content && Object.keys(content).length === 0) {
      content.accounts = {};
    }
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
