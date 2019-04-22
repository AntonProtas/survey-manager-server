<<<<<<< HEAD
const User = require('../models/user');
const Survey = require('../models/survey');

exports.getUsersData = async (limit, currentPage) => {
  const options = {
    select: 'username role email registrationDate',
    populate: 'role',
=======
const User = require("../models/user");
const Survey = require("../models/survey");

exports.getUsersData = async (limit, currentPage) => {
  const options = {
    select: "username role registrationDate",
    populate: "role",
>>>>>>> 1655682d6578447d4f9af3d68294f8d58ccc7eaa
    limit: parseInt(limit, 10),
    page: parseInt(currentPage, 10)
  };

  const usersData = await User.paginate({}, options);

<<<<<<< HEAD
=======
  console.log("usersData", usersData);

>>>>>>> 1655682d6578447d4f9af3d68294f8d58ccc7eaa
  const totalUsersSurveys = await Promise.all(
    usersData.docs.map(
      async item => await await Survey.countDocuments({ user: item._id })
    )
  );

  return {
<<<<<<< HEAD
    total: usersData.total,
    page: usersData.page,
    pages: usersData.pages,
=======
>>>>>>> 1655682d6578447d4f9af3d68294f8d58ccc7eaa
    usersData: usersData.docs,
    totalUsersSurveys
  };
};
<<<<<<< HEAD

exports.changeUserName = async (id, newName) => {
  return await User.findOneAndUpdate({ _id: id }, { username: newName });
};

exports.changeUserEmail = async (id, newEmail) => {
  return await User.findOneAndUpdate({ _id: id }, { email: newEmail });
};

exports.deleteUser = async id => {
  return await User.deleteOne({ _id: id });
};
=======
>>>>>>> 1655682d6578447d4f9af3d68294f8d58ccc7eaa
