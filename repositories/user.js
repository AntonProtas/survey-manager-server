const User = require('../models/user');

module.exports.saveUser = async userData => {
  const user = new User(userData);
  return await user.save();
};
