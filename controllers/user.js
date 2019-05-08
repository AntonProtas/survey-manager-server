const httpStatusCodes = require('http-status-codes');
const { addUser } = require('../services/user');
const { authUser } = require('../services/user');
const {
  validation,
  validationSchemaUser,
  validationSchemaAuthUser
} = require('../helpers/validation');

const validError = require('../ER/errors/validError');

exports.addUser = async ctx => {
  try {
    const { error, value } = validation(ctx.request.body, validationSchemaUser);
    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      await addUser({
        username: value.username,
        email: value.email.toLowerCase(),
        password: value.password,
        role: value.role
      });
      ctx.status = httpStatusCodes.CREATED;
      ctx.body = {
        username: value.username,
        email: value.email.toLowerCase()
      };
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};

exports.authUser = async ctx => {
  try {
    const { error, value } = validation(
      ctx.request.body,
      validationSchemaAuthUser
    );
    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      const dataUser = await authUser({
        email: value.email.toLowerCase(),
        password: value.password
      });
      if (!!dataUser) {
        ctx.body = {
          message: 'Login successful',
          token: dataUser.token,
          username: dataUser.username,
          email: dataUser.email,
          id: dataUser.id
        };
        ctx.status = httpStatusCodes.OK;
      }
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};
