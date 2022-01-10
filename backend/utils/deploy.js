const { fork } = require("child_process");
const { EventEmitter } = require("events");
const { envConfig } = require("../configs/envConfig");

const logger = require("../configs/logger");
const { showNotification } = require("../notify");

exports.eventEmmit = new EventEmitter();
exports.logs = [];

exports.deploy = (event, args) => {
  const { app, path, port, region } = args;
  const liara =
    envConfig.PLATFORM === "win32" ? ".\\liara" : "./node_modules/.bin/liara";
  const child = fork(
    liara,
    ["deploy", `--app`, app, `--port`, port, `--path`, path, `--detach`],
    {
      stdio: ["pipe", "pipe", "pipe", "ipc"],
      cwd:
        envConfig.PLATFORM === "win32"
          ? `${process.cwd()}\\node_modules\\.bin`
          : undefined,
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
    if (err.message == "Channel closed") {
      return "";
    }
    console.log(err);
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
      showNotification("done", app, region);
      event.sender.send("deploy", {
        log: "",
        status: "done",
      });
    }
  });

  this.eventEmmit.on("cancel-deploy", () => {
    child.send({ message: "cancel" });
    event.sender.send("deploy", {
      log: "",
      status: "cancel",
    });
  });
};
