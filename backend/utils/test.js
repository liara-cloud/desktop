const { execPromise } = require("./exec");
const { readLiaraJson } = require("./account.management");
const { createEncodedUrl } = require("./urlEncoder");

(async function () {
  console.log(createEncodedUrl(8989));
  // console.log(await readLiaraJson());
  // execPromise("ls", { timeout: 1000 })
  //   .then((out) => {
  //     console.log(out);
  //   })
  //   .catch((err) => console.log(err));
})();
