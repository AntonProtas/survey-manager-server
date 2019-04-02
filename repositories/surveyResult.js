const SurveyResult = require('../models/surveyResult');

exports.saveSurveyResult = async result => {
  const surveyResult = new SurveyResult(result);
  await surveyResult.save();
};
