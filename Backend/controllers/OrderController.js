const Order = require('../models/order');

const OrderController = {
    async addOrder(req,res,next){
        try {
            const {userName, items, mrpAmount, discountAmount, totalAmount, address} = req.body;
            const {userId} = req.params;
            const order = new Order({
                userId,
                userName,
                items, 
                mrpAmount, 
                discountAmount, 
                totalAmount, 
                address
            });
            const response = await order.save();
            res.status(201).json(response);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = OrderController;