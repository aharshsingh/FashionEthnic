const { loginSchema } = require('../../services/validators');
const customErrorHandler = require('../../services/customErrorHandler');
const bcrypt = require('bcrypt');
const JwtService = require('../../services/JwtScervice');
const User = require('../../models/user');

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
    }
};

module.exports = loginController;
