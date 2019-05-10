const ClientError = require('./ClientError');
const httpStatusCodes = require('http-status-codes');
class ValidError extends ClientError {
  constructor(message) {
    super(httpStatusCodes.FORBIDDEN, message);
  }
}
module.exports = ValidError;
