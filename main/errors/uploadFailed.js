class UploadFailed extends Error {
  constructor(message, data) {
    super(message);
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = UploadFailed;
