const ApiError = require('./errors/ApiError');

exports.handleApiError = async (error, ctx) => {
  console.log(error);
  if (error instanceof ApiError) {
    ctx.body = {
      message: error.message
    };
    ctx.status = error.code;
  }
};
