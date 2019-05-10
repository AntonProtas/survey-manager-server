const httpStatusCodes = require('http-status-codes');
const {
  saveSurvey,
  getSurveys,
  getSurveyById,
  deleteSurvey
} = require('../services/survey');
const {
  saveSurveyResult,
  getSurveyResults,
  deleteSurveyResults
} = require('../services/surveyResult');

const { validation, surveysGetSchema } = require('../helpers/validation');
const validError = require('../ER/errors/ValidError');

exports.saveSurvey = async ctx => {
  try {
    await saveSurvey(ctx.request.body);
    ctx.status = httpStatusCodes.CREATED;
    ctx.body = {
      message: 'survey has been saved'
    };
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};

exports.deleteSurvey = async ctx => {
  try {
    const { id } = ctx.request.query;
    await deleteSurvey(id);
    await deleteSurveyResults(id);
    ctx.status = httpStatusCodes.CREATED;
    ctx.body = {
      message: 'survey delete successful'
    };
  } catch (error) {
    ctx.app.emit('error', error, ctx);
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
    ctx.app.emit('error', error, ctx);
  }
};

exports.getSurveys = async ctx => {
  try {
    const { error, value } = validation(ctx.request.query, surveysGetSchema);
    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      const surveys = await getSurveys(
        value.user,
        value.limit,
        value.currentPage
      );
      ctx.body = {
        surveys: surveys.docs,
        total: surveys.total,
        countPages: surveys.pages,
        page: surveys.page
      };
      ctx.status = httpStatusCodes.OK;
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};

exports.getSurveyById = async ctx => {
  try {
    const { id } = ctx.request.query;
    if (!id) {
      throw new validError('id is required');
    } else {
      const survey = await getSurveyById(id);
      ctx.body = {
        survey: survey
      };
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};

exports.getSurveyResults = async ctx => {
  try {
    const { surveyId } = ctx.request.query;
    if (!surveyId) {
      throw new validError('surveyId is required');
    } else {
      const results = await getSurveyResults(surveyId);
      ctx.body = {
        results: results
      };
      ctx.status = httpStatusCodes.OK;
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};
