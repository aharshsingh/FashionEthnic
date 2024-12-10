const Joi = require('joi');

const registerSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const tokenSchema = Joi.object({
    token : Joi.string().required()
});

const adminRegisterSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,16}$')).required(),
    role: Joi.string().required()
});

module.exports = { registerSchema, loginSchema, tokenSchema, adminRegisterSchema };