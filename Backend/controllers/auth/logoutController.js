const JwtService = require('../../services/JwtScervice');
const {JWT_SECRET} = require('../../config/index');
const redisClient = require('../../redisClient');

const logoutController = {
    async logout(req,res,next){
        const {token} = req.body;
        if (!token) return res.status(401).json({ message: "No token provided" });
        const expiry = JwtService.getRemainingTime(token, JWT_SECRET);
        redisClient.setEx(token, expiry, "blacklisted");
        res.status(200).json({ message: "Logged out successfully" });
    }
}

module.exports = logoutController;