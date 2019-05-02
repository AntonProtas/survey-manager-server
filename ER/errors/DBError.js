const ApiError = require('./ApiError');

class DBError extends ApiError {
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }
}

module.exports = DBError;
