const User = require('../models/user');
const Role = require('./../models/role');
const MustBeUniqueError = require('../ER/errors/MustBeUniqueError');

exports.saveUser = async userData => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new MustBeUniqueError('email');
    }
  }
};

exports.getUser = async email => {
  return await User.findOne({ email }).populate('role');
};
