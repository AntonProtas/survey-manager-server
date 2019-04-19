const { getUsersData } = require("../repositories/users");

exports.getUsersData = async (limit, currentPage) => {
  try {
    return await getUsersData(limit, currentPage);
  } catch (err) {
    throw err;
  }
};
