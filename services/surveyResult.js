const {
  saveSurveyResult,
  getSurveyResults,
  deleteSurveyResults
} = require('../repositories/surveyResult');

exports.saveSurveyResult = async data => {
  try {
    await saveSurveyResult(data);
  } catch (err) {
    throw err;
  }
};

exports.deleteSurveyResults = async data => {
  try {
    await deleteSurveyResults(data);
  } catch (err) {
    throw err;
  }
};

exports.getSurveyResults = async data => {
  try {
    return await getSurveyResults(data);
  } catch (err) {
    throw err;
  }
};
