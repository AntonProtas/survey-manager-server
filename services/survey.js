const { saveSurvey } = require('../repositories/survey');

exports.addSurvey = async data => {
  try {
    await saveSurvey(data);
  } catch (err) {
    throw err;
  }
};
