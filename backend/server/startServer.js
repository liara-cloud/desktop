const http = require("http");

const getPort = require("get-port");

const { httpServer } = require("./httpServer");

exports.startServer = async () => {
  const port = await getPort();
  const server = http.createServer(httpServer).listen(port);
  return server;
};

(async function () {
  await module.exports.startServer();
})();
