const DBError = require('./DBError');
const httpStatusCodes = require('http-status-codes');

class NotFoundError extends DBError {
  constructor(field) {
    super(httpStatusCodes.NOT_FOUND, `${field} not found`);
  }
}

module.exports = NotFoundError;
