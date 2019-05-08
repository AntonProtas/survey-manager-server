const SurveyResult = require('../models/surveyResult');
const SaveDbError = require('../ER/errors/SaveDbError');
const RemoveDBError = require('../ER/errors/RemoveDBError');
const NotFoundError = require('../ER/errors/NotFoundError');

exports.saveSurveyResult = async result => {
  try {
    const surveyResult = new SurveyResult(result);
    await surveyResult.save();
  } catch (error) {
    throw new SaveDbError('survey');
  }
};

exports.getSurveyResults = async id => {
  try {
    return await SurveyResult.find({ surveyId: id }).select(
      'answers userId -_id'
    );
  } catch (error) {
    throw new NotFoundError('Survey result');
  }
};

exports.deleteSurveyResults = async id => {
  try {
    return await SurveyResult.deleteMany({ surveyId: id });
  } catch (error) {
    throw new RemoveDBError('survey');
  }
};
