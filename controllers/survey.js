const httpStatusCodes = require('http-status-codes');
const { addSurvey } = require('../services/survey');

exports.addSurvey = async ctx => {
  try {
    await addSurvey(ctx.request.body);
  } catch (error) {
    console.log(error);
  }
};
