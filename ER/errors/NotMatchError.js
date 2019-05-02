const ClientError = require('./ClientError');
const httpStatusCodes = require('http-status-codes');
class NotMatchError extends ClientError {
  constructor(fields) {
    super(httpStatusCodes.FORBIDDEN, `${fields} does not match`);
  }
}
module.exports = NotMatchError;
