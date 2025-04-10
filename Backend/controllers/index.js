const adminRegisterController = require('./auth/adminRegisterController')
const loginController = require('./auth/loginController');
const registerController = require('./auth/registerController');
const productController = require('./productController');
const userController = require('./userController');
const wishListController = require('./wishListController');
const cartController = require('./cartController');
const OrderController = require('./OrderController');
const logoutController = require('./auth/logoutController');
const adminController = require('./adminController');

module.exports = { adminRegisterController, loginController, registerController, productController, userController, wishListController, cartController, OrderController, logoutController, adminController }