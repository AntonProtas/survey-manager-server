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
      ctx.body = {
        username: value.username,
        email: value.email
      };
    }
  } catch (err) {
    ctx.status = httpStatusCodes.FORBIDDEN;
    ctx.body = {
      message: 'email already exists'
    };
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
      const dataUser = await authUser(value);
      if (!!dataUser) {
        ctx.body = {
          message: 'Login successful',
          token: dataUser.token,
          username: dataUser.username,
          email: dataUser.email,
          id: dataUser.id
        };
        ctx.status = httpStatusCodes.OK;
      } else {
        ctx.body = { message: "Username or pass didn't match" };
        ctx.status = httpStatusCodes.UNAUTHORIZED;
      }
    }
  } catch (err) {
    ctx.status = httpStatusCodes.BAD_REQUEST;
    ctx.body = { message: 'Incorrect username or password.' };
  }
};
