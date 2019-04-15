const {
  saveSurvey,
  getSurveys,
  getSurveyById,
  deleteSurvey
} = require('../repositories/survey');

exports.saveSurvey = async data => {
  try {
    await saveSurvey(data);
  } catch (err) {
    throw err;
  }
};

exports.deleteSurvey = async data => {
  try {
    await deleteSurvey(data);
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
