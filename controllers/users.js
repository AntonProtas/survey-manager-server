const httpStatusCodes = require('http-status-codes');
const {
  getUsersData,
  changeUserName,
  changeUserEmail,
  deleteUser,
  changeUserRole
} = require('../services/users');
const { validation, adminSchema } = require('../helpers/validation');
const validError = require('../ER/errors/ValidError');

exports.getUsersData = async ctx => {
  try {
    const { error, value } = validation(
      ctx.request.query,
      adminSchema['getUsersData']
    );

    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      const { limit, currentPage, sort } = value;
      const result = await getUsersData(limit, currentPage, sort);
      ctx.body = {
        ...result
      };
      ctx.status = httpStatusCodes.OK;
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};

exports.changeUserName = async ctx => {
  try {
    const { error, value } = validation(
      ctx.request.body,
      adminSchema['changeUserName']
    );

    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      const { id, newName } = value;
      await changeUserName(id, newName);
      ctx.status = httpStatusCodes.OK;
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};

exports.changeUserEmail = async ctx => {
  try {
    const { error, value } = validation(
      ctx.request.body,
      adminSchema['changeUserEmail']
    );

    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      const { id, newEmail } = value;
      await changeUserEmail(id, newEmail);
      ctx.status = httpStatusCodes.OK;
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};

exports.deleteUser = async ctx => {
  try {
    const { error, value } = validation(
      ctx.request.body,
      adminSchema['userId']
    );

    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      const { id } = value;
      await deleteUser(id);
      ctx.status = httpStatusCodes.OK;
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};

exports.changeUserRole = async ctx => {
  try {
    const { error, value } = validation(
      ctx.request.body,
      adminSchema['changeUserRole']
    );

    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      const { newRole, userId } = value;
      await changeUserRole(newRole, userId);
      ctx.status = httpStatusCodes.OK;
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};
