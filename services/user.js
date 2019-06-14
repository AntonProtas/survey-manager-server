const { saveUser } = require('../repositories/user');
const { getUser } = require('../repositories/user');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../ER/errors/NotFoundError');
const NotMatchError = require('../ER/errors/NotMatchError');
const aws = require('aws-sdk');
const fs = require('fs');

exports.uploadFile = async ({ fileName, filePath, fileType }) => {
  return new Promise((resolve, reject) => {
    aws.config.update({
      region: 'us-east-2',
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const s3 = new aws.S3({
      apiVersion: '2012-10-17'
    });

    const stream = fs.createReadStream(filePath);

    stream.on('error', err => reject(err));

    s3.upload(
      {
        ACL: 'public-read',
        Bucket: 'images-storage-sm',
        Body: stream,
        Key: fileName,
        ContentType: fileType
      },
      (err, data) => {
        if (!!err) {
          reject(err);
        } else if (data) {
          resolve({ key: data.Key, url: data.Location });
        }
      }
    );
  });
};

exports.addUser = async data => {
  try {
    let today = new Date();
    today = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(
      today.getDate()
    ).padStart(2, '0')}/${today.getFullYear()}`;
    data.registrationDate = today;
    await saveUser(data);
  } catch (err) {
    throw err;
  }
};

exports.authUser = async data => {
  try {
    const { password, email } = data;
    const user = await getUser(email);
    if (!user) {
      throw new NotFoundError('user');
    }
    const passwordIsMatch = await user.comparePasswords(password);
    if (!passwordIsMatch) {
      throw new NotMatchError('email or password');
    }
    if (!!user && passwordIsMatch) {
      return {
        token: jwt.sign(
          {
            id: user._id,
            username: user.username,
            role: user.role.role,
            email: email
          },
          process.env.SECRET
        ),
        username: user.username,
        email: user.email,
        id: user._id
      };
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};
