const { spawn } = require("child_process");
const logger = require("../configs/logger");

exports.deploy = (event, args) => {
  const { app, path, port } = args;
  const child = spawn(
    "liara deploy",
    [`--app=${app} --port=${port} --path=${path} --detach`],
    {
      shell: true,
    }
  );

  logger.info("Deployment started");
  child.stdout.on("data", (data) => {
    event.sender.send("deploy", { log: data.toString(), status: "success" });
  });

  child.stderr.on("data", (data) => {
    event.sender.send("deploy", { log: data.toString(), status: "success" });
  });

  child.on("error", (err) => {
    logger.error("Deployment Failed");
    event.sender.send("deploy", {
      log: "Failed to start deployment",
      status: "error",
    });
  });

  child.on("close", (code) => {
    if (code !== 0) {
     event.sender.send("deploy", {
        log: `Deploy process exited with code ${code}`,
        status: "error",
      });
    }
    if (code == 0) {

      event.sender.send("deploy", {
        log: `Deployment is completed successfully `,
        status: "done",
      });
    }
  });
};
