const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Product = require('./product');

const cartItemSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    required: true
    },
    item: [
        { 
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          quantity: {
            type: Number,
            required: true, 
            min: 1
          },
          size: {
            type: String,
            required: true
          },
          name: {
            type: String,
            required: true
          },
          about: {
            type: String,
            required: true
          },
          price:{
            type: Number,
            required: true
          },
          discount:{
            type: Number,
            required: true
          }
        }
    ],
    totalItems: {
      type: Number,
            required: true
    }
});
cartItemSchema.path('item').schema.set('_id', false);
module.exports = mongoose.model('CartItem', cartItemSchema, 'cartItems');