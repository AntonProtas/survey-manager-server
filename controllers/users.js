const User = require('../models/user');
const Role = require('../models/role');
const SurveyResult = require('../models/surveyResult');
const Survey = require('../models/survey');

exports.getUsersData = async ctx => {
  const { limit, currentPage } = ctx.request.query;
  const options = {
    select: '',
    populate: 'role',
    limit: parseInt(limit, 10),
    page: parseInt(currentPage, 10)
  };

  const query = {};

  const usersData = await User.paginate(query, options);

  const usersId = usersData.docs.map(item => item._id);

  const data = usersId.forEach(item => aswSurvey.find({ user: item }));

  ctx.body = {
    data
  };
};
