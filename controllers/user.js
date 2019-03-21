const httpStatusCodes = require('http-status-codes');
const { addUser } = require('../services/user');
const { authUser } = require('../services/user');
const {
  validation,
  validationSchemaUser,
  validationSchemaAuthUser
} = require('../helpers/validation');

exports.addUser = async ctx => {
  try {
    const { error, value } = validation(ctx.request.body, validationSchemaUser);
    if (!!error) {
      ctx.status = httpStatusCodes.BAD_REQUEST;
      ctx.body = error;
    } else {
      await addUser(value);
      ctx.status = httpStatusCodes.CREATED;
    }
  } catch (err) {
    ctx.status = httpStatusCodes.FORBIDDEN;
    ctx.message = 'email already exists';
  }
};

exports.authUser = async ctx => {
  try {
    const { error, value } = validation(
      ctx.request.body,
      validationSchemaAuthUser
    );
    if (!!error) {
      ctx.status = httpStatusCodes.BAD_REQUEST;
      ctx.body = error;
    } else {
      const _token = await authUser(value);

      if (!!_token) {
        ctx.body = {
          message: 'Login successful',
          token: _token
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
