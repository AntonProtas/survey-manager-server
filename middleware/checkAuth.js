const jwt = require('jsonwebtoken');

exports.checkAuth = async (ctx, next) => {
  console.log(ctx.request);
  try {
    const token = ctx.request.header.token;
    jwt.verify(token, process.env.SECRET);
    await next();
  } catch (err) {
    console.log(err);
  }
};

