const User = require('../models/user');
const Survey = require('../models/survey');
const Role = require('../models/role');

exports.getUsersData = async (limit, currentPage) => {
  const options = {
    select: 'username email role registrationDate',
    populate: 'role',
    limit: parseInt(limit, 10),
    page: parseInt(currentPage, 10)
  };

  const usersData = await User.paginate({}, options);
  const totalUsersSurveys = await Promise.all(
    usersData.docs.map(
      async item => await await Survey.countDocuments({ user: item._id })
    )
  );

  return {
    total: usersData.total,
    page: usersData.page,
    pages: usersData.pages,
    usersData: usersData.docs,
    totalUsersSurveys
  };
};

exports.changeUserName = async (id, newName) => {
  return await User.findOneAndUpdate({ _id: id }, { username: newName });
};

exports.changeUserEmail = async (id, newEmail) => {
  return await User.findOneAndUpdate({ _id: id }, { email: newEmail });
};

exports.deleteUser = async id => {
  return await User.deleteOne({ _id: id });
};

exports.changeUserRole = async (newRole, userId) => {
  console.log(newRole, userId);
  const role = await Role.findOne({ role: newRole });
  return await User.findOneAndUpdate({ _id: userId }, { role: role._id });
};
