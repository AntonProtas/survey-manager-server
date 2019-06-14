const httpStatusCodes = require('http-status-codes');
const { addUser, authUser, uploadFile } = require('../services/user');
const { validation, userSchema } = require('../helpers/validation');
const validError = require('../ER/errors/ValidError');
const sharp = require('sharp');
const fs = require('fs');

exports.addUser = async ctx => {
  try {
    const { error, value } = validation(
      ctx.request.body,
      userSchema['addUser']
    );
    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      await addUser({
        username: value.username,
        email: value.email.toLowerCase(),
        password: value.password,
        role: value.role
      });
      ctx.status = httpStatusCodes.CREATED;
      ctx.body = {
        username: value.username,
        email: value.email.toLowerCase()
      };
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};

exports.authUser = async ctx => {
  try {
    const { error, value } = validation(
      ctx.request.body,
      userSchema['authUser']
    );
    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      const dataUser = await authUser({
        email: value.email.toLowerCase(),
        password: value.password
      });
      if (!!dataUser) {
        ctx.body = {
          message: 'Login successful',
          token: dataUser.token,
          username: dataUser.username,
          id: dataUser.id
        };
        ctx.status = httpStatusCodes.OK;
      }
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};

exports.setProfileImage = async ctx => {
  const file = ctx.request.files.image;
  const imgagePath = 'output-image-profile.jpg';
  await sharp(file.path)
    .resize(400, 400)
    .toFile(imgagePath);
  const { key, url } = await uploadFile({
    fileName: file.name,
    filePath: imgagePath,
    fileType: file.type
  });
  await fs.unlinkSync(imgagePath);
  ctx.body = { key, url };
};
