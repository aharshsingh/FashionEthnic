const mongoose = require('mongoose');
const Product = require('./product');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'customer' },
    address: { type: String },
    phoneNumber: { type: Number},
    totalItems: {type: Number, default: 0},
    cartItems: [{ 
        product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
        },
        quantity: {type: Number}
    }],
    wishList: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
            }
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema, 'users');