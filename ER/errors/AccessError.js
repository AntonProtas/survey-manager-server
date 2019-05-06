const ClientError = require('./ClientError');
const httpStatusCodes = require('http-status-codes');
class AccessError extends ClientError {
  constructor(message) {
    super(httpStatusCodes.UNAUTHORIZED, `You are not ${message}`);
  }
}
module.exports = AccessError;
