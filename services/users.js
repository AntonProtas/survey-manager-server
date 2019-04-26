const {
  getUsersData,
  changeUserName,
  changeUserEmail,
  deleteUser,
  changeUserRole
} = require('../repositories/users');

exports.getUsersData = async (limit, currentPage, sort = 'default') => {
  try {
    return await getUsersData(limit, currentPage, sort);
  } catch (err) {
    throw err;
  }
};

exports.changeUserName = async (id, newName) => {
  try {
    return await changeUserName(id, newName);
  } catch (err) {
    throw err;
  }
};

exports.changeUserEmail = async (id, newEmail) => {
  try {
    return await changeUserEmail(id, newEmail);
  } catch (err) {
    throw err;
  }
};

exports.deleteUser = async id => {
  try {
    return await deleteUser(id);
  } catch (err) {
    throw err;
  }
};

exports.changeUserRole = async (newRole, userId) => {
  try {
    return await changeUserRole(newRole, userId);
  } catch (err) {
    throw err;
  }
};
