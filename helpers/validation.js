const Joi = require("joi");

exports.surveySchema = {
  surveysGet: {
    user: Joi.string().required(),
    currentPage: Joi.string().required(),
    limit: Joi.string().required()
  },
  surveySave: {
    user: Joi.string().required(),
    surveyName: Joi.string().required(),
    pages: Joi.object().required(),
    setting: Joi.object().required(),
    url: Joi.string().required()
  },
  idSurvey: {
    id: Joi.string().required()
  },
  saveSurveyResult: {
    answers: Joi.object().required(),
    surveyId: Joi.string().required(),
    userId: Joi.string()
  }
};

exports.adminSchema = {
  getUsersData: {
    limit: Joi.string().required(),
    currentPage: Joi.string().required(),
    sort: Joi.string()
  },
  changeUserName: {
    id: Joi.string().required(),
    newName: Joi.string()
      .required()
      .trim()
      .min(2)
  },
  changeUserEmail: {
    id: Joi.string().required(),
    newEmail: Joi.string()
      .email()
      .required()
  },
  userId: {
    id: Joi.string().required()
  },
  changeUserRole: {
    userId: Joi.string().required(),
    newRole: Joi.string().required()
  }
};

exports.userSchema = {
  addUser: {
    username: Joi.string()
      .trim()
      .min(2)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .regex(/^(?=(.*\d){1,})/)
      .regex(/^(?=.*[A-Z]{1,})/)
      .trim()
      .required(),
    role: Joi.string().required()
  },
  authUser: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .regex(/^(?=(.*\d){2,})/)
      .regex(/^(?=.*[A-Z]{1,})/)
      .trim()
      .required()
  }
};

exports.validation = (value, schema) => {
  return Joi.validate(value, schema);
};
