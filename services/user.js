const { saveUser } = require('../repositories/user');
const { getUser } = require('../repositories/user');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../ER/errors/NotFoundError');
const NotMatchError = require('../ER/errors/NotMatchError');

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
          { id: user._id, username: user.username, role: user.role.role },
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
