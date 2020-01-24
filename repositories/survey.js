const Survey = require('../models/survey');
const SaveDbError = require('../ER/errors/SaveDbError');
const RemoveDBError = require('../ER/errors/RemoveDBError');
const NotFoundError = require('../ER/errors/NotFoundError');

exports.saveSurvey = async surveyData => {
  try {
    const survey = new Survey(surveyData);
    await survey.save();
  } catch (error) {
    throw new SaveDbError('survey');
  }
};

exports.getSurveys = async (user, limit, currentPage) => {
  try {
    const options = {
      select: 'surveyName url',
      limit: parseInt(limit, 10),
      page: parseInt(currentPage, 10)
    };

    const query = {
      user: user
    };

    return await Survey.paginate(query, options);
  } catch (error) {
    throw new NotFoundError('surveys');
  }
};

exports.getSurveyById = async id => {
  try {
    return await Survey.find({ _id: id }).select('surveyName pages setting');
  } catch (error) {
    throw new NotFoundError('surveys');
  }
};

exports.deleteSurvey = async id => {
  try {
    return await Survey.deleteOne({ _id: id });
  } catch (error) {
    throw new RemoveDBError('survey');
  }
};
