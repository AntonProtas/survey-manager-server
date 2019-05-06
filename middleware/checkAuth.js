const jwt = require('jsonwebtoken');
const AccessError = require('../ER/errors/AccessError');

exports.checkAuth = async (ctx, next) => {
  console.log(ctx.request);
  try {
    const token = ctx.request.header.token;
    jwt.verify(token, process.env.SECRET);
    await next();
  } catch (err) {
    throw new AccessError('logged');
  }
};
