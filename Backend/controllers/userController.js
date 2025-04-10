const User = require('../models/user');
const registerSchema = require('../validators/userValidator')
const CustomErrorHandler = require('../services/customErrorHandler');
const JwtService = require('../services/JwtScervice');

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

    async userId(req,res,next){
        try {
            const token = req.body.token;
            const payload = JwtService.verify(token);
            const exist = await User.exists({ _id: payload._id });
            if(exist){
                const user = await User.findOne({ _id: payload._id }).select('-__v -createdAt -updatedAt -userName -email -role -address -phoneNumber -password -cartItems -wishList');
                res.json(user);
            }
            else{
                return next(CustomErrorHandler.notFound('User not found!'));
            }
        } catch (error) {
            return next(error);
        }
    },

    async userDetails(req,res,next){
        let document;
        try {
            document = await User.findOne({_id : req.params.id}).select('-__v -createdAt -updatedAt -password -cartItems -wishList -totalItems -role');
        } catch (error) {
            return next(CustomErrorHandler.notFound("User not Found!"));
        }
        return res.json(document);
    },

    async userCartDetails(req,res,next){
        let document;
        try {
            document = await User.findOne({_id : req.params.id}).select('-_id -userName -email -role -address -phoneNumber -__v -createdAt -updatedAt');
        } catch (error) {
            return next(CustomErrorHandler.notFound("User not Found!"));
        }
        return res.json(document);
    },

    async updateUser(req,res,next){
        try {
            const { address, phoneNumber, dob, gender } = req.body; 
            const { userId } = req.params;
            const updateFields = {};
            if (address) updateFields.address = address;
            if (phoneNumber) updateFields.phoneNumber= phoneNumber;
            if (dob) updateFields.dob = dob;
            if (gender) updateFields.gender = gender;
            console.log(updateFields)
            const result = await User.findByIdAndUpdate(userId, updateFields, {new:true});
            return res.status(200).json({result});
        } catch (error) {
            return next(error);
        }
    },

    async getAllUser(req,res,next){
        try {
            const result = await User.find();
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).json({"error": "Internal server error"});
        }
    }
}

module.exports = userController;