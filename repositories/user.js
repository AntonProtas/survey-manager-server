const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.saveUser = async userData => {
  const user = new User(userData);
  return await user.save();
};

exports.searcUser = async userData => {
  const { email, password } = userData;

  const user = await User.findOne({ email });

  if (user && user.comparePasswords(password)) {
    return jwt.sign({ _id: user }, process.env.SECRET);
  } else {
    return false;
  }
};
