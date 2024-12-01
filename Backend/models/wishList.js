const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Product = require('./product');

const wishListSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item: [
        { 
        product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
        }
    }
    ]
});

module.exports = mongoose.model('WishList', wishListSchema, 'wishLists');