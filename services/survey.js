const { saveSurvey, getSurveys } = require('../repositories/survey');

exports.saveSurvey = async data => {
  try {
    await saveSurvey(data);
  } catch (err) {
    throw err;
  }
};

exports.getSurveys = async user => {
  try {
    return await getSurveys(user);
  } catch (err) {
    throw err;
  }
};
