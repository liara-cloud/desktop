const { spawn } = require("child_process");
const { EventEmitter } = require("events");

const logger = require("../configs/logger");

exports.eventEmmit = new EventEmitter();
exports.logs = [];
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
      event.sender.send("deploy", {
        log: `Deploy process exited with code ${code}`,
        status: "error",
      });
    }
    if (code == 0) {
      event.sender.send("deploy", {
        log: "",
        status: "done",
      });
    }
  });

  this.eventEmmit.on("cancel-deploy", () => {
    spawn("taskkill", ["/pid", child.pid, "/f", "/t"]);
    event.sender.send("deploy", {
      log: "Deployment cancelled successfully",
      status: "cancel",
    });
  });
};
