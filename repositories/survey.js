const Survey = require('../models/survey');

exports.saveSurvey = async surveyData => {
  const survey = new Survey(surveyData);
  await survey.save();
};

exports.getSurveys = async (user, limit, currentPage) => {
  const options = {
    select: 'surveyName url',
    limit: parseInt(limit, 10),
    page: parseInt(currentPage, 10)
  };

  const query = {
    user: user
  };

  return await Survey.paginate(query, options);
};

exports.getSurveyById = async id => {
  return await Survey.find({ _id: id }).select('surveyName pages setting');
};

//.find({ user: user }).select('surveyName url');
