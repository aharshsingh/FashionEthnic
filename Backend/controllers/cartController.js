const Cart = require('../models/cartItem');

const cartController = {
    async updateCart(req, res, next) {
        const userId = req.params.id;
        const { productArray, totalItems } = req.body.cart; 
        try {
            let existingCart = await Cart.findOne({ userId });
    
            if (existingCart) {
                existingCart.item = productArray;
                existingCart.totalItems = totalItems;
                await existingCart.save(); 
                res.status(200).json({ message: 'Cart updated successfully', cart: existingCart });
            } else {
                const newCart = new Cart({
                    userId,
                    item: productArray,
                    totalItems
                });
                await newCart.save();
                res.status(201).json({ message: 'Cart created successfully', cart: newCart });
            }
        } catch (error) {
            console.error('Error updating cart:', error);
            next(error);
        }
    },

    async getCart(req,res,next){
        const userId = req.params.userId;
        let result;
        try {
            result = await Cart.findOne({ userId: userId }).select('-__v');
            res.status(200).json({ result });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = cartController;