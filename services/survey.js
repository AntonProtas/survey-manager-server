const { saveSurvey } = require('../repositories/survey');

exports.saveSurvey = async data => {
  try {
    await saveSurvey(data);
  } catch (err) {
    throw err;
  }
};
