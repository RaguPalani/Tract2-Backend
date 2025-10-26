const Joi = require('joi');

const taskCreateSchema = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  description: Joi.string().max(2000).allow('', null),
  status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending'),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
  dueDate: Joi.date().iso().allow(null),
  assignedTo: Joi.string().hex().length(24).allow(null)
});

const taskUpdateSchema = Joi.object({
  title: Joi.string().min(2).max(200),
  description: Joi.string().max(2000).allow('', null),
  status: Joi.string().valid('pending', 'in-progress', 'completed'),
  priority: Joi.string().valid('low', 'medium', 'high'),
  dueDate: Joi.date().iso().allow(null),
  assignedTo: Joi.string().hex().length(24).allow(null)
});

module.exports = { taskCreateSchema, taskUpdateSchema };