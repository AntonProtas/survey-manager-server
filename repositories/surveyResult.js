const SurveyResult = require('../models/surveyResult');

exports.saveSurveyResult = async result => {
  const surveyResult = new SurveyResult(result);
  await surveyResult.save();
};

exports.getSurveyResults = async id => {
  return await SurveyResult.find({ surveyId: id }).select(
    'answers userId -_id'
  );
};
