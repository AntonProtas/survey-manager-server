const { saveUser } = require('../repositories/user');

module.exports.formatUser = async data => {
  try {
    await saveUser(data);
  } catch (err) {
    throw err;
  }
};
