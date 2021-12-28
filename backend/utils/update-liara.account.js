const { readFile, writeFile, stat } = require("fs/promises");

const { envConfig } = require("../configs/envConfig");

exports.updateLiaraJson = async (data) => {
  try {
    console.log(data);
    const content =
      JSON.parse(await readFile(envConfig.GLOBAL_CONF_PATH + "s")) || {};

    const newContent = Object.assign(content, data);
    await writeFile(envConfig.GLOBAL_CONF_PATH, JSON.stringify(newContent));
    return newContent;
  } catch (error) {
    console.log("hi");
    return {};
  }
};

(async function () {
  console.log(
    await module.exports.updateLiaraJson({
      api_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWM4MTYyYzNkZTI0ZTdiNzAwODIyYmQiLCJpYXQiOjE2NDA1MDI5Mzh9.Qk0vffr-oz3EQuLQrdDhPq2gtwyvT-vqD7CfhrHyoY0",
      region: "iran",
    })
  );
})();
