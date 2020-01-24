const jwt = require('jsonwebtoken');
const AccessError = require('../ER/errors/AccessError');
const ValidError = require('../ER/errors/ValidError');

exports.checkAdmin = async (ctx, next) => {
  try {
    const token = ctx.request.header.token;

    if (!token) {
      throw new ValidError('token not found!');
    } else {
      const decoded = jwt.verify(token, process.env.SECRET);
      if (decoded.role === 'admin') {
        await next();
      }
    }
  } catch (error) {
    ctx.app.emit('error', new AccessError('administrator!'), ctx);
  }
};
