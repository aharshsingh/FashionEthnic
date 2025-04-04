const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    APP_PORT : process.env.APP_PORT,
    DB_URL : process.env.DB_URL,
    JWT_SECRET : process.env.JWT_SECRET,
    APP_URL : process.env.APP_URL,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD
}