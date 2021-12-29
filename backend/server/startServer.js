const http = require("http");

const getPort = require("get-port");

const { updateLiaraJson } = require("../utils/update-liara.account");
const { envConfig } = require("../configs/envConfig");

exports.startServer = async (event) => {
  const port = await getPort();
  envConfig.OPEN_PORT = port;
  const server = http
    .createServer(async (req, res) => {
      const buffers = [];
      if (req.url === "/callback" && req.method === "POST") {
        for await (const chunk of req) {
          buffers.push(chunk);
        }
        const data = JSON.parse(Buffer.concat(buffers).toString() || "{}");
        event.sender.send("open-console", await updateLiaraJson(data));
        server.close();
      }
      res.end();
    })
    .listen(port);
  return server;
};
