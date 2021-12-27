const { exec } = require("child_process");

const awaitTimeout = (delay) => {
  let timeout;
  const promise = new Promise((resolve, reject) => {
    //TODO Handling Error
    timeout = setTimeout(() => reject("Error"), delay);
  });
  return {
    promise,
    cancel: function () {
      return clearTimeout(timeout);
    },
  };
};

const awaitExec = (command, timeoutClear) =>
  new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      // TODO Handling Error
      timeoutClear.cancel();
      resolve(stdout);
    });
    // resolve(execSync(command, { encoding: "utf-8" }));
    // timeoutClear.cancel();
  });

exports.execPromise = (command, { timeout }) => {
  const timeoutClear = awaitTimeout(timeout);
  return Promise.race([awaitExec(command, timeoutClear), timeoutClear.promise]);
};
