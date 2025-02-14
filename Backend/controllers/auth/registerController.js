const CustomErrorHandler = require('../../services/customErrorHandler');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const { registerSchema } = require('../../services/validators');
const redisClient = require('../../redisClient');

const registerController = {
    async signup(req, res, next) {
        
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        try {
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                return next(CustomErrorHandler.alreadyExists('Email is already registered'));
            }
        } catch (err) {
            return next(err);
        }

        const { userName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            userName,
            email,
            password: hashedPassword,
        });
        
        try {
            const result = await user.save();
            const userData = JSON.stringify({ username: userName, email });
            redisClient.publish("user_registered", userData);
        } catch (err) {
            return next(err);
        }
        res.send('Hello, you are now registered!');
    },
};

module.exports = registerController;
