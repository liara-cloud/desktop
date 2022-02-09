const { envConfig } = require('../configs/envConfig');

exports.createEncodedUrl = (port, page) => {
  const query = `desktop=v1&callbackURL=localhost:${port}/callback`;
  return `${
    page === 'login' ? envConfig.LIARA_LOGIN_PAGE : envConfig.LIARA_REGISTER_PAGE
  }?${Buffer.from(query).toString('base64')}`;
};
