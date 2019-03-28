const { saveUser } = require('../repositories/user');
const { getUser } = require('../repositories/user');
const jwt = require('jsonwebtoken');

exports.addUser = async data => {
  try {
    await saveUser(data);
  } catch (err) {
    throw err;
  }
};

exports.authUser = async data => {
  try {
    const { password, email } = data;
    const user = await getUser(email);
    const passwordIsMatch = await user.comparePasswords(password);
    console.log(user);
    if (!!user && passwordIsMatch) {
      return {
        token: jwt.sign(
          { id: user._id, username: user.username },
          process.env.SECRET
        ),
        username: user.username,
        email: user.email,
        id: user._id
      };
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};
