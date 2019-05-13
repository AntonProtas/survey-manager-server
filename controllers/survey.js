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

const { validation, surveySchema } = require('../helpers/validation');
const validError = require('../ER/errors/ValidError');

exports.getSurveys = async ctx => {
  try {
    const { error, value } = validation(
      ctx.request.query,
      surveySchema['surveysGet']
    );
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

exports.saveSurvey = async ctx => {
  try {
    const { error } = validation(ctx.request.body, surveySchema['surveySave']);

    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      await saveSurvey(ctx.request.body);
      ctx.status = httpStatusCodes.CREATED;
      ctx.body = {
        message: 'survey has been saved'
      };
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};

exports.deleteSurvey = async ctx => {
  try {
    const { error } = validation(ctx.request.query, surveySchema['idSurvey']);
    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      const { id } = ctx.request.query;
      await deleteSurvey(id);
      await deleteSurveyResults(id);
      ctx.status = httpStatusCodes.OK;
      ctx.body = {
        message: 'survey delete successful'
      };
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};

exports.saveSurveyResult = async ctx => {
  try {
    const { error } = validation(
      ctx.request.body,
      surveySchema['saveSurveyResult']
    );

    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      saveSurveyResult(ctx.request.body);
      ctx.status = httpStatusCodes.CREATED;
      ctx.body = {
        message: 'result save successful'
      };
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};

exports.getSurveyById = async ctx => {
  try {
    const { error } = validation(ctx.request.query, surveySchema['idSurvey']);

    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      const { id } = ctx.request.query;
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
    const { error } = validation(ctx.request.query, surveySchema['idSurvey']);

    if (!!error) {
      throw new validError(error.details[0].message);
    } else {
      const { id } = ctx.request.query;
      const results = await getSurveyResults(id);
      ctx.body = {
        results
      };
      ctx.status = httpStatusCodes.OK;
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};
