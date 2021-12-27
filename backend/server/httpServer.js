const { updateLiaraJson } = require("../utils/update-liara.account");

exports.httpServer = async (req, res) => {
  const buffers = [];
  if (req.url === "/callback" && req.method === "POST") {
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = JSON.parse(Buffer.concat(buffers).toString());
    await updateLiaraJson(data);
  }
  res.end();
};
