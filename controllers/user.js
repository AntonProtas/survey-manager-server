const httpStatusCodes = require('http-status-codes');
const { formatUser } = require('../services/user');
const { formatDataUser } = require('../services/user');
const { validation } = require('../helpers/validation');
const { validationSchemaUser } = require('../helpers/validation');
const { validationSchemaAuthUser } = require('../helpers/validation');

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
    ctx.status = httpStatusCodes.FORBIDDEN;
    ctx.message = 'user already exists';
  }
};

exports.checkUser = async ctx => {
  try {
    const { error, value } = validation(
      ctx.request.body,
      validationSchemaAuthUser
    );
    if (!!error) {
      ctx.status = httpStatusCodes.BAD_REQUEST;
      ctx.body = error;
    } else {
      if (await formatDataUser(value)) {
        ctx.body = {
          message: 'Login successful',
          token: await formatDataUser(value)
        };
        ctx.status = httpStatusCodes.OK;
      } else {
        ctx.body = { message: 'username or pass didnt match' };
        ctx.status = httpStatusCodes.UNAUTHORIZED;
      }
    }
  } catch (err) {
    ctx.status = httpStatusCodes.BAD_REQUEST;
    ctx.message = 'validation error';
  }
};
