const got = require('got');

exports.getAll = function (APIConfig) {
  return got.get(`/v1/projects`, APIConfig)
};