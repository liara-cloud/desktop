const { readFile, writeFile } = require("fs/promises");

const { envConfig } = require("../configs/envConfig");

exports.updateLiaraJson = async (data) => {
  try {
    const content = JSON.parse(await readFile(envConfig.GLOBAL_CONF_PATH));

    const newContent = Object.assign(content, data);
    await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(newContent));
    return newContent;
  } catch (error) {
    const newContent = Object.assign({}, data);
    await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(newContent));
    return newContent;
  }
};

// (async function () {
//   console.log(
//     await module.exports.updateLiaraJson({
//       api_token:
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWM4MTYyYzNkZTI0ZTdiNzAwODIyYmQiLCJpYXQiOjE2NDA1MDI5Mzh9.Qk0vffr-oz3EQuLQrdDhPq2gtwyvT-vqD7CfhrHyoY0",
//       region: "iran",
//     })
//   );
// })();
