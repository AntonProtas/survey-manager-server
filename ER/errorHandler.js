const ApiError = require('./errors/ApiError');

exports.handleApiError = async (ctx, next) => {
  if (ctx.state.error instanceof ApiError) {
    ctx.body = {
      message: ctx.state.error.message
    };
    ctx.status = ctx.state.error.code;
  }
};
