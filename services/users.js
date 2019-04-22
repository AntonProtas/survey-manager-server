<<<<<<< HEAD
const {
  getUsersData,
  changeUserName,
  changeUserEmail,
  deleteUser
} = require('../repositories/users');
=======
const { getUsersData } = require("../repositories/users");
>>>>>>> 1655682d6578447d4f9af3d68294f8d58ccc7eaa

exports.getUsersData = async (limit, currentPage) => {
  try {
    return await getUsersData(limit, currentPage);
  } catch (err) {
    throw err;
  }
};
<<<<<<< HEAD

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
=======
>>>>>>> 1655682d6578447d4f9af3d68294f8d58ccc7eaa
