const Joi = require('joi');

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
    .trim(),
  role: Joi.string(),
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
};

exports.validation = (value, schema) => {
  return Joi.validate(value, schema);
};
