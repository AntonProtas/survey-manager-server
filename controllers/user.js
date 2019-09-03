const httpStatusCodes = require('http-status-codes');
const {
  addUser,
  authUser,
  uploadFile,
  updateProfileImageUrl
} = require('../services/user');
const { validation, userSchema } = require('../helpers/validation');
const validError = require('../ER/errors/ValidError');
const sharp = require('sharp');
const fs = require('fs');
const shortid = require('shortid');

exports.addUser = async ctx => {
  try {
    console.log(ctx.request.body);
    const { error, value } = validation(
      ctx.request.body,
      userSchema['addUser']
    );
    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      await addUser({
        fullName: value.fullName,
        email: value.email.toLowerCase(),
        password: value.password,
        role: value.role
      });
      ctx.status = httpStatusCodes.CREATED;
      ctx.body = {
        fullName: value.fullName,
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
        console.log(dataUser);
        ctx.body = {
          message: 'Login successful',
          token: dataUser.token
        };
        ctx.status = httpStatusCodes.OK;
      }
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};

exports.setProfileImage = async ctx => {
  try {
    const userData = JSON.parse(ctx.request.body.userData);
    const image = ctx.request.files.image;
    const imgagePath = 'output-image-profile.jpg';
    console.log(userData);
    await sharp(image.path)
      .extract({
        left: userData.left,
        top: userData.top,
        width: userData.width,
        height: userData.height
      })
      .toFile(imgagePath);
    const { key, url } = await uploadFile({
      fileName: `${userData.id}${shortid.generate()}`,
      filePath: imgagePath,
      fileType: image.type
    });
    await fs.unlinkSync(imgagePath);
    if (!!key && !!url) {
      console.log(key, url);
      const result = await updateProfileImageUrl(userData.id, url);
      if (!!result) {
        ctx.body = {
          message: 'Update successful',
          url: url
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
