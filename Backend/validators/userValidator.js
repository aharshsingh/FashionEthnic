const Joi = require('joi');

const registerSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().default('customer'),
    address: Joi.string(), 
    phoneNumber: Joi.number().integer(), 
    totalItems: Joi.number().integer().default(0),
    cartItems: Joi.array().items(Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().integer().min(1).default(1)
    })).default([]) 
});

module.exports = registerSchema;