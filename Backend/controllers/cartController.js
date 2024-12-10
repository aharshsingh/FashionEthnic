const Cart = require('../models/cartItem');

const cartController = {
    async updateCart(req,res,next){
        const id = req.params.id;
        const {item, quantity, size} = req.body;

        try {
            if(!item){
                return res.status(400).json({ message: 'Invalid items array' });  
            }
            let cart = await Cart.findOne({ userId: id });
            if (!cart) {
                cart = new Cart({
                    userId,
                    item: [
                        {
                            product,
                            quantity,
                            size,
                        },
                    ],
                });
            }else {
                const existingItem = cart.item.find(
                    (i) => i.product.equals(product) && i.size === size
                );

                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cart.item.push({
                        product,
                        quantity,
                        size,
                    });
                }
            } 
            await cart.save();
            res.status(200).json({ message: 'Cart updated successfully', cart });
        } catch (error) {
            console.error('Error updating cart:', error);
            next(error);
        }
    }
}

module.exports = cartController;