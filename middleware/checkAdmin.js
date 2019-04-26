const jwt = require('jsonwebtoken');

exports.checkAdmin = async (ctx, next) => {
  console.log(ctx.request);
  try {
    const token = ctx.request.header.token;
    const decoded = jwt.verify(token, process.env.SECRET);
    if (decoded.role === 'admin') {
      await next();
    } else {
      throw new Error("don't have admin rights");
    }
  } catch (err) {
    console.log(err);
  }
};
