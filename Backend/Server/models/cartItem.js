const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Product = require('./product');
const cartItemSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item: { 
        product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
        },
        quantity: {type: Number, default: 1}
    }
});

module.exports = mongoose.model('CartItem', cartItemSchema, 'cartItems');