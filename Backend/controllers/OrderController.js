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
    },
    async getOrder(req,res,next){
        const {userId} = req.params;
        try {
            const response = await Order.find({userId}).select('items address status orderDate -_id');
            res.status(200).json(response);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = OrderController;