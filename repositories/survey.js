const Survey = require('../models/survey');

exports.saveSurvey = async surveyData => {
  const survey = new Survey(surveyData);
  await survey.save();
  const surveys = await Survey.find()
    .populate('user')
    .select('title user');
  console.log(surveys);
};
