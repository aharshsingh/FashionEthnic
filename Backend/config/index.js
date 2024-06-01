const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    APP_PORT : process.env.APP_PORT,
    DB_URL : process.env.DB_URL,
    APP_URL : process.env.APP_URL
}