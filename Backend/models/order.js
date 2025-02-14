const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'},
    userName: {type:String, required: true},
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
            },
        quantity: {
            type: Number
        }, 
        size: {
            type: String
        }
    }],
    mrpAmount: {type: Number, required: true},
    discountAmount: {type: Number, required: true},
    totalAmount: {type: Number, required: true},
    address: {type: String, required: true},
    status: {type: String, default: "Delivery in process"},
    orderDate: {type: Date, default: Date.now,}
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema, 'orders');