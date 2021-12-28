const { spawn } = require("child_process");

exports.deploy = (event, args) => {
  const { app, path, port } = args;
  const child = spawn(
    "liara deploy",
    [`--app=${app} --port=${port} --path=${path}`],
    {
      shell: true,
    }
  );

  child.stdout.on("data", (data) => {
    event.sender.send("send-logs", data);
  });

  child.stderr.on("data", (data) => {
    event.sender.send("send-logs", data);
  });

  child.on("error", (err) => {
    event.sender.send("send-logs", "Failed to start deployment");
  });

  child.on("close", (code) => {
    if (code !== 0) {
      event.sender.send("send-logs", `deploy process exited with code ${code}`);
    }
  });
};
