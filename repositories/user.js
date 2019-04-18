const User = require('../models/user');
const Role = require('./../models/role');

exports.saveUser = async userData => {
  const user = new User(userData);
  return await user.save();
};

exports.getUser = async email => {
  return await User.findOne({ email }).populate('role');
};
