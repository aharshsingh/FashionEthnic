const Joi = require('joi');

const productSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().min(0).required(),
        about: Joi.string().required(),
        material: Joi.string().required(),
        care: Joi.string().required(),
        colour: Joi.string().required(),
        gender: Joi.string().valid('male', 'female', 'unisex').required(),
        fit: Joi.string().required(),
        size: Joi.string().required(),
        rating: Joi.number().max(5).required(),
        discount: Joi.number().max(100).required(),
    });

module.exports = productSchema;