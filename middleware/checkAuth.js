const jwt = require('jsonwebtoken');
const AccessError = require('../ER/errors/AccessError');

exports.checkAuth = async (ctx, next) => {
  try {
    const token = ctx.request.header.token;
    jwt.verify(token, process.env.SECRET);
    await next();
  } catch (error) {
    ctx.app.emit('error', new AccessError('logged!'), ctx);
  }
};
