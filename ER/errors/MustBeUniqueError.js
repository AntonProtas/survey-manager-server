const DBError = require('./DBError');
const httpStatusCodes = require('http-status-codes');

class MustBeUniqueError extends DBError {
  constructor(field) {
    super(httpStatusCodes.UNAUTHORIZED, `${field} already exists`);
  }
}

module.exports = MustBeUniqueError;
