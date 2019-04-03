const httpStatusCodes = require('http-status-codes');
const { saveSurvey, getSurveys, getSurveyById } = require('../services/survey');
const {
  saveSurveyResult,
  getSurveyResults
} = require('../services/surveyResult');

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

exports.saveSurveyResult = async ctx => {
  try {
    saveSurveyResult(ctx.request.body);
    ctx.status = httpStatusCodes.CREATED;
    ctx.body = {
      message: 'result save successful'
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      message: 'survey save failed'
    };
    ctx.status = httpStatusCodes.BAD_REQUEST;
  }
};

exports.getSurveys = async ctx => {
  try {
    const { user, limit, currentPage } = ctx.request.query;

    if (user && limit && currentPage) {
      const surveys = await getSurveys(user, limit, currentPage);
      ctx.body = {
        surveys: surveys.docs,
        total: surveys.total,
        countPages: surveys.pages,
        page: surveys.page
      };
      ctx.status = httpStatusCodes.OK;
    } else {
      ctx.body = {
        message: 'valid error'
      };
      ctx.status = httpStatusCodes.BAD_REQUEST;
    }
  } catch (error) {
    ctx.body = {
      message: 'not found'
    };
    ctx.status = httpStatusCodes.BAD_REQUEST;
  }
};

exports.getSurveyById = async ctx => {
  try {
    const { id } = ctx.request.query;
    if (!!id) {
      const survey = await getSurveyById(id);
      ctx.body = {
        survey: survey
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

exports.getSurveyResults = async ctx => {
  try {
    const { surveyId } = ctx.request.query;
    if (!!surveyId) {
      const results = await getSurveyResults(surveyId);
      ctx.body = {
        results: results
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
    ctx.body = {
      message: 'SURVEYS RESULTS NOT FOUND'
    };
    ctx.status = httpStatusCodes.BAD_REQUEST;
  }
};
