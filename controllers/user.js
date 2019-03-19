const httpStatusCodes = require('http-status-codes');
const { formatUser } = require('../services/user');
const { validation } = require('../helpers/validation');
const { validationSchemaUser } = require('../helpers/validation');

exports.addUser = async ctx => {
  try {
    const { error, value } = validation(ctx.request.body, validationSchemaUser);
    if (!!error) {
      ctx.status = httpStatusCodes.BAD_REQUEST;
      ctx.body = error;
    } else {
      await formatUser(ctx.request.body);
      ctx.status = httpStatusCodes.CREATED;
    }
  } catch (err) {
    console.log(ctx.status, ctx.message);
    ctx.status = httpStatusCodes.FORBIDDEN;
    ctx.message = 'user already exists';
    console.log(ctx.status, ctx.message);
  }
};
