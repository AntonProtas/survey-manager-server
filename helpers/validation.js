const Joi = require('joi');

exports.surveysGetSchema = {
  user: Joi.string().required(),
  currentPage: Joi.string().required(),
  limit: Joi.string().required()
};

exports.validationSchemaUser = {
  username: Joi.string()
    .trim()
    .min(2)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .regex(/^(?=(.*\d){2,})/)
    .regex(/^(?=.*[A-Z]{1,})/)
    .trim()
    .required(),
  role: Joi.string().required(),
  registrationDate: Joi.string()
};

exports.validationSchemaAuthUser = {
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .regex(/^(?=(.*\d){2,})/)
    .regex(/^(?=.*[A-Z]{1,})/)
    .trim()
    .required()
};

exports.validation = (value, schema) => {
  return Joi.validate(value, schema);
};
