const Joi = require('joi');
const User = require('../models/user');
const registerSchema = require('../validators/userValidator')
const CustomErrorHandler = require('../middlewares/customErrorHandler');

const userController = {
    async register(req,res,next) {
        
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        let result;
        try {
            const exist = await User.exists({ email: req.body.email });
            if(!exist){
                const { userName, email, role, address, phoneNumber, totalItems, cartItems } = req.body;
                const user = new User({
                    userName,
                    email,
                    role,
                    address,
                    phoneNumber,
                    totalItems,
                    cartItems
                });
                try {
                    result = await user.save();
                } catch (error) {
                    return next(error);
                }
            }
            else{
                return next(CustomErrorHandler.alreadyExists('Email is already registered'));
            }
        } catch (error) {
            return next(error);
        }
        res.json({result});
    },

    async userInfo(req,res,next){
        try {
            const exist = await User.exists({ email: req.params.email });
            if(exist){
                const user = await User.findOne({ email: req.params.email }).select('-__v -createdAt -updatedAt -cartItems._id');
                res.json(user);
            }
            else{
                return next(CustomErrorHandler.notFound('User not found!'));
            }
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = userController;