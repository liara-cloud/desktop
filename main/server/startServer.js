const http = require("http");
const getPort = require("get-port");
const logger = require("../configs/logger");
const { headers } = require("../configs/headers");
const { envConfig } = require("../configs/envConfig");
const { updateLiaraJson } = require("../utils/update-liara-account");

exports.startServer = async (event) => {
  const port = await getPort();
  envConfig.OPEN_PORT = port;
  logger.info(`server start listening on port: ${port}`);
  const server = http
    .createServer(async (req, res) => {
      if (req.method === "OPTIONS") {
        res.writeHead(204, headers);
        res.end();
        return;
      }
      const buffers = [];
      if (req.url === "/callback" && req.method === "POST") {
        for await (const chunk of req) {
          buffers.push(chunk);
        }
        const { data } = JSON.parse(Buffer.concat(buffers).toString() || "[]");
        const updatedUserAccounts = await updateLiaraJson(data)
        event.sender.send("open-console", updatedUserAccounts);
        logger.info("liara.json updated with new credentials");
        logger.info("POST request recieved and server closed");
        res.writeHead(200, headers);
        res.end();
        return
      }
      // server.close();
    })
    .listen(port);
  return server;
};
