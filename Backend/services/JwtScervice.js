const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

class JwtService {
    static sign(payload, expiry = '4h', secret = JWT_SECRET) {
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }
    static verify(token, secret = JWT_SECRET) {
        return jwt.verify(token, secret);
    }
    static getRemainingTime(token, secret) {
        try {
          const decoded = jwt.decode(token); 
          if (!decoded || !decoded.exp) {
            return null; 
          }
    
          const currentTime = Math.floor(Date.now() / 1000); 
          const remainingTime = decoded.exp - currentTime;
    
          return remainingTime > 0 ? remainingTime : 0; 
        } catch (error) {
          return null; 
        }
      }
}

module.exports = JwtService;
