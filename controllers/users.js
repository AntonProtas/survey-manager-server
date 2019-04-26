const httpStatusCodes = require('http-status-codes');
const {
  getUsersData,
  changeUserName,
  changeUserEmail,
  deleteUser,
  changeUserRole
} = require('../services/users');

exports.getUsersData = async ctx => {
  try {
    const { limit, currentPage, sort } = ctx.request.query;
    if (!!limit && !!currentPage) {
      const result = await getUsersData(limit, currentPage, sort);
      ctx.body = {
        ...result
      };
      ctx.status = httpStatusCodes.OK;
    } else {
      console.log(error);
      ctx.body = error;
      ctx.status = httpStatusCodes.BAD_REQUEST;
    }
  } catch (error) {
    console.log(error);
    ctx.status = httpStatusCodes.BAD_REQUEST;
  }
};

exports.changeUserName = async ctx => {
  try {
    const { id, newName } = ctx.request.body;
    if (!!id && !!newName) {
      await changeUserName(id, newName);
      ctx.status = httpStatusCodes.OK;
    } else {
      console.log(error);
      ctx.body = error;
      ctx.status = httpStatusCodes.BAD_REQUEST;
    }
  } catch (error) {
    console.log(error);
    ctx.status = httpStatusCodes.BAD_REQUEST;
  }
};

exports.changeUserEmail = async ctx => {
  try {
    const { id, newEmail } = ctx.request.body;
    if (!!id && !!newEmail) {
      await changeUserEmail(id, newEmail);
      ctx.status = httpStatusCodes.OK;
    } else {
      console.log(error);
      ctx.body = error;
      ctx.status = httpStatusCodes.BAD_REQUEST;
    }
  } catch (error) {
    console.log(error);
    ctx.status = httpStatusCodes.BAD_REQUEST;
  }
};

exports.deleteUser = async ctx => {
  try {
    const { id } = ctx.request.body;
    if (!!id) {
      await deleteUser(id);
      ctx.status = httpStatusCodes.OK;
    } else {
      console.log(error);
      ctx.body = error;
      ctx.status = httpStatusCodes.BAD_REQUEST;
    }
  } catch (error) {
    console.log(error);
    ctx.status = httpStatusCodes.BAD_REQUEST;
  }
};

exports.changeUserRole = async ctx => {
  try {
    const { newRole, userId } = ctx.request.body;
    if (!!newRole && !!userId) {
      await changeUserRole(newRole, userId);
      ctx.status = httpStatusCodes.OK;
    } else {
      console.log(error);
      ctx.body = error;
      ctx.status = httpStatusCodes.BAD_REQUEST;
    }
  } catch (error) {
    console.log(error);
    ctx.status = httpStatusCodes.BAD_REQUEST;
  }
};
