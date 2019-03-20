const { saveUser } = require('../repositories/user');
const { searcUser } = require('../repositories/user');

exports.formatUser = async data => {
  try {
    await saveUser(data);
  } catch (err) {
    throw err;
  }
};

exports.formatDataUser = async data => {
  try {
    return await searcUser(data);
  } catch (err) {
    throw err;
  }
};
