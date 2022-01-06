const { readFile, writeFile } = require("fs/promises");

const { envConfig } = require("../configs/envConfig");
const logger = require("../configs/logger");

const mergeContent = async (content, data) => {
  // convert token to api_token
  data.map((obj) => {
    obj["api_token"] = obj.token;
    delete obj.token;
    return obj;
  });

  const fixData = data.reduce(function (target, key, index) {
    const accountName = `${key.email.split("@")[0]}_${key.region}`;
    target[accountName] = key;
    if (key.current == true) {
      content.current = accountName;
      content.api_token = key.api_token;
      content.region = key.region;
    }
    return target;
  }, {});
  let newContent;
  if (content.accounts && Object.entries(content.accounts) !== 0) {
    newContent = Object.assign(content, {
      accounts: Object.assign(content.accounts, fixData),
    });
  } else {
    newContent = Object.assign(content, { accounts: fixData });
  }
  await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(newContent));
  logger.info("Liara.json updated with new credentials");
  return newContent;
};

exports.updateLiaraJson = async (data) => {
  try {
    const content = JSON.parse(await readFile(envConfig.GLOBAL_CONF_PATH));
    return await mergeContent(content, data);
  } catch (error) {
    console.log(error);
    return await mergeContent({}, data);
  }
};

(async () => {
  const data = [
    {
      fullname: "علی قلی",
      region: "iran",
      avatar: "//www.gravatar.com/avatar/09e040dc8d02631fc9974006e5c1504a?d=mp",
      email: "aligholi8220@gmail.com",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWEyOGU4ZDQyMGU0NTAwMTFhM2EyNTYiLCJpYXQiOjE2NDExMDkwMDR9.eFLrQkYtYG4Ahum2rCokHdEN0ZW7TYA8ruG_5lndrYc",
      current: false,
    },
    {
      avatar: "//www.gravatar.com/avatar/a18391f95368f90280e844cd37777a0f?d=mp",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWQxNTY4ZmZiYjNlN2I1NmEyMTlmMTAiLCJpYXQiOjE2NDExMDkxMzV9.1b1cubbTZmeK7vzRb2XBHLiNV3MDv5qcqrmSvgSw1Ag",
      email: "testtestte2sat@gmail.com",
      region: "iran",
      fullname: "لیارا قلی تست",
      current: true,
    },
    {
      avatar: "new avatar",
      token: "new token",
      email: "new email",
      region: "iran",
      fullname: "my name",
      current: "iran",
    },
  ];
  await this.updateLiaraJson(data);
})();
