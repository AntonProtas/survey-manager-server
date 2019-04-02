const { saveSurveyResult } = require('../repositories/surveyResult');

exports.saveSurveyResult = async data => {
  try {
    await saveSurveyResult(data);
  } catch (err) {
    throw err;
  }
};
