const { spawn } = require("child_process");
const logger = require("../configs/logger");

exports.deploy = (event, args) => {
  const { app, path, port } = args;
  const child = spawn(
    "liara deploy",
    [`--app=${app} --port=${port} --path=${path}`],
    {
      shell: true,
    }
  );

  logger.info("Deployment started");
  child.stdout.on("data", (data) => {
    event.sender.send("send-logs", data.toString());
  });

  child.stderr.on("data", (data) => {
    event.sender.send("send-logs", data.toString());
  });

  child.on("error", (err) => {
    logger.error("Deployment Failed");
    event.sender.send("send-logs", "Failed to start deployment");
  });

  child.on("close", (code) => {
    if (code !== 0) {
      event.sender.send("send-logs", `deploy process exited with code ${code}`);
    }
  });
};
