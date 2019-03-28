const {
  saveSurvey,
  getSurveys,
  getSurveyById
} = require('../repositories/survey');

exports.saveSurvey = async data => {
  try {
    await saveSurvey(data);
  } catch (err) {
    throw err;
  }
};

exports.getSurveys = async (user, limit, currentPage) => {
  try {
    return await getSurveys(user, limit, currentPage);
  } catch (err) {
    throw err;
  }
};

exports.getSurveyById = async Id => {
  try {
    return await getSurveyById(Id);
  } catch (err) {
    throw err;
  }
};
