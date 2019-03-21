const User = require('../models/user');

exports.saveUser = async userData => {
  const user = new User(userData);
  return await user.save();
};

exports.getUser = async email => {
  return await User.findOne({ email });
};
