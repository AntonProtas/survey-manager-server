const httpStatusCodes = require('http-status-codes');
const { saveSurvey, getSurveys } = require('../services/survey');

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

exports.getSurveys = async ctx => {
  try {
    const { user } = ctx.request.query;
    if (!!user) {
      const surveys = await getSurveys(user);
      ctx.body = {
        surveys: surveys
      };
      ctx.status = httpStatusCodes.OK;
    } else {
      ctx.body = {
        message: 'valid error'
      };
      ctx.status = httpStatusCodes.BAD_REQUEST;
    }
  } catch (error) {
    console.log(error);
    ctx.status = httpStatusCodes.BAD_REQUEST;
  }
};
