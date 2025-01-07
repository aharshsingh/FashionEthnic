const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'},
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
            },
        quantity: {
            type: Number
        }
    }],
    mrpAmount: {type: Number, required: true},
    discountAmount: {type: Number, required: true},
    totalAmount: {type: Number, required: true},
    address: {type: String, required: true}
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema, 'orders');