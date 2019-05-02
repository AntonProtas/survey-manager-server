const ValidError = require('./errors/validError');
const MustBeUnique = require('./errors/MustBeUniqueError');
const NotFoundError = require('./errors/NotFoundError');
const NotMatchError = require('./errors/NotMatchError');

exports.handleApiError = async (ctx, next) => {
  if (ctx.state.error instanceof ValidError) {
    ctx.body = {
      message: ctx.state.error.message
    };
    ctx.status = ctx.state.error.code;
  }
  if (ctx.state.error instanceof MustBeUnique) {
    ctx.body = {
      message: ctx.state.error.message
    };
    ctx.status = ctx.state.error.code;
  }
  if (ctx.state.error instanceof NotFoundError) {
    ctx.body = {
      message: ctx.state.error.message
    };
    ctx.status = ctx.state.error.code;
  }
  if (ctx.state.error instanceof NotMatchError) {
    ctx.body = {
      message: ctx.state.error.message
    };
    ctx.status = ctx.state.error.code;
  }
};
