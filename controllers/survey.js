const httpStatusCodes = require('http-status-codes');
const { saveSurvey } = require('../services/survey');

exports.saveSurvey = async ctx => {
  try {
    await saveSurvey(ctx.request.body);
    ctx.status = httpStatusCodes.CREATED;
    ctx.body = {
      message: 'survey save successful'
    };
  } catch (error) {
    ctx.body = {
      message: 'survey save failed'
    };
    ctx.status = httpStatusCodes.BAD_REQUEST;
  }
};
