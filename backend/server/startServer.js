const http = require("http");

const getPort = require("get-port");

const logger = require("../configs/logger");
const { updateLiaraJson } = require("../utils/update-liara.account");
const { envConfig } = require("../configs/envConfig");

exports.startServer = async (event) => {
  const port = await getPort();
  envConfig.OPEN_PORT = port;
  logger.info(`server start listening on port: ${port}`);
  const server = http
    .createServer(async (req, res) => {
      const buffers = [];
      if (req.url === "/callback" && req.method === "POST") {
        for await (const chunk of req) {
          buffers.push(chunk);
        }
        const data = JSON.parse(Buffer.concat(buffers).toString() || "{}");
        event.sender.send("open-console", await updateLiaraJson(data));
        logger.info("liara.json updated with new credentials");
        server.close();
        logger.info("POST request recieved and server closed");
      }
      res.end();
    })
    .listen(port);
  return server;
};
