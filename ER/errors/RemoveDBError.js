const DBError = require('./DBError');
const httpStatusCodes = require('http-status-codes');

class RemoveDBError extends DBError {
  constructor(field) {
    super(httpStatusCodes.INTERNAL_SERVER_ERROR, `${field} remove failed`);
  }
}

module.exports = RemoveDBError;
