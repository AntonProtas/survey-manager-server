const DBError = require('./DBError');
const httpStatusCodes = require('http-status-codes');

class SaveDbError extends DBError {
  constructor(field) {
    super(httpStatusCodes.INTERNAL_SERVER_ERROR, `${field} save failed`);
  }
}

module.exports = SaveDbError;
