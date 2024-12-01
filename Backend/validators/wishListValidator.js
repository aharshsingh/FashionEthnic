const Joi = require('joi');

const wishListSchema = Joi.object({
        userId: Joi.string().required(),
        productId: Joi.string().required()
    });

module.exports = wishListSchema;