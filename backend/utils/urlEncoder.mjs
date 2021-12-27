import { envConfig } from "../configs/envConfig.js";

export const createEncodedUrl = (port) => {
  const url = `${envConfig.LIARA_LOGIN_PAGE}?desktop=v1&callbackURL=localhost:${port}/callback`;
  return Buffer.from(url).toString("base64");
};
