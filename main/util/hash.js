const crypto = require('crypto'); 

const hash = buf => {
  return crypto.createHash('sha256').update(buf).digest('hex');
};

module.exports = hash;