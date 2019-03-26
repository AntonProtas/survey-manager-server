const Survey = require('../models/survey');

exports.saveSurvey = async surveyData => {
  const survey = new Survey(surveyData);
  await survey.save();
};

exports.getSurveys = async user => {
  return await Survey.find({ user: user }).select('surveyName pages setting');
};
