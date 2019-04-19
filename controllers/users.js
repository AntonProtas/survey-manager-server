const httpStatusCodes = require("http-status-codes");
const { getUsersData } = require("../services/users");

exports.getUsersData = async ctx => {
  try {
    const { limit, currentPage } = ctx.request.query;
    if (!!limit && !!currentPage) {
      const result = await getUsersData(limit, currentPage);
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
