const ApiError = require('./errors/ApiError');

exports.handleApiError = async (error, ctx) => {
  if (error instanceof ApiError) {
    ctx.body = {
      message: error.message
    };
    ctx.status = error.code;
  }
};
