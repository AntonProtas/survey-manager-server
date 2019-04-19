const User = require("../models/user");
const Survey = require("../models/survey");

exports.getUsersData = async (limit, currentPage) => {
  const options = {
    select: "username role registrationDate",
    populate: "role",
    limit: parseInt(limit, 10),
    page: parseInt(currentPage, 10)
  };

  const usersData = await User.paginate({}, options);

  console.log("usersData", usersData);

  const totalUsersSurveys = await Promise.all(
    usersData.docs.map(
      async item => await await Survey.countDocuments({ user: item._id })
    )
  );

  return {
    usersData: usersData.docs,
    totalUsersSurveys
  };
};
