const { loginSchema } = require('../../services/validators');
const customErrorHandler = require('../../services/customErrorHandler');
const bcrypt = require('bcrypt');
const JwtService = require('../../services/JwtScervice');
const User = require('../../models/user');
const redisClient = require('../../redisClient');

const loginController = {
    async login(req, res, next) {
        try {
            const { error } = loginSchema.validate(req.body);
            if (error) {
                return next(error);
            }

            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return next(customErrorHandler.notAuthrorised('Username or password is wrong'));
            }

            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return next(customErrorHandler.notAuthrorised('Username or password is wrong'));
            }

            const token = JwtService.sign({ _id: user.id, role: user.role });
            res.json({ token });
        } catch (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async forgotPassword(req,res,next){
        const {email} = req.body;
        const result = await User.findOne({email});
        if(!result){
            return next(customErrorHandler.notFound('User email not found'));
        }

        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        redisClient.setEx(email, 300, OTP);
        const userData = JSON.stringify({ email, OTP });
        redisClient.publish("forgot_password", userData);
        res.send('OTP send successfully');
    },

    async resetPassword(req,res,next){
        const {password, otp, email} = req.body;
        try {
        const storedOtp = await redisClient.get(email);
        if(storedOtp !== otp){
            return next(customErrorHandler.notAuthrorised('Otp is wrong'));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.findOneAndUpdate({email}, {$set: {password: hashedPassword}}, {new : true})
        res.send(result);
        } catch (error) {
            return next(error);
        }
    }
};

module.exports = loginController;
