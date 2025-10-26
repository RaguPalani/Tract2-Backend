const Joi = require('joi');

const employeeCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  position: Joi.string().max(100).allow('', null),
  department: Joi.string().max(100).allow('', null),
  phone: Joi.string().max(30).allow('', null)
});

const employeeUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  email: Joi.string().email(),
  position: Joi.string().max(100).allow('', null),
  department: Joi.string().max(100).allow('', null),
  phone: Joi.string().max(30).allow('', null)
});

module.exports = { employeeCreateSchema, employeeUpdateSchema };