const { spawn } = require("child_process");
const { EventEmitter } = require("events");

const logger = require("../configs/logger");
const { showNotification } = require("../notify");

exports.eventEmmit = new EventEmitter();
exports.logs = [];
exports.deploy = (event, args) => {
  const { app, path, port } = args;

  const child = spawn("./node_modules/.bin/liara", [
    "deploy",
    `--app`,
    app,
    `--port`,
    port,
    `--path`,
    path,
    `--detach`,
  ]);

  logger.info("Deployment started");
  child.stdout.on("data", (data) => {
    this.logs.push(data.toString());
    event.sender.send("deploy", { log: data.toString(), status: "success" });
  });

  child.stderr.on("data", (data) => {
    this.logs.push(data.toString());
    event.sender.send("deploy", { log: data.toString(), status: "success" });
  });

  child.on("error", (err) => {
    logger.error("Deployment Failed");
    this.logs.push("Failed to start deployment");

    event.sender.send("deploy", {
      log: "Failed to start deployment",
      status: "error",
    });
  });

  child.on("close", (code) => {
    if (code == 2) {
      this.logs.push(`Deploy process exited with code ${code}`);
      showNotification("error");
      event.sender.send("deploy", {
        log: `Deploy process exited with code ${code}`,
        status: "error",
      });
    }
    if (code == 0) {
      showNotification("done");
      event.sender.send("deploy", {
        log: "",
        status: "done",
      });
    }
  });

  this.eventEmmit.on("cancel-deploy", () => {
    child.kill("SIGTERM");
    event.sender.send("deploy", {
      log: "Deployment cancelled successfully",
      status: "cancel",
    });
  });
};
