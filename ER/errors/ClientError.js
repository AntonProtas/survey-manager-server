const ApiError = require('./ApiError');

class ClientError extends ApiError {
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }
}

module.exports = ClientError;
