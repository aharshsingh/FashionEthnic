const express = require('express');
const router = express.Router();
const {adminRegisterController, loginController, registerController, adminController, productController, userController, wishListController, cartController, OrderController} = require('../controllers/index')
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.post("/signup", registerController.signup);
router.post("/signin", loginController.login);
router.post("/adminRegister", adminRegisterController.adminRegister);
router.post("/addInfo", userController.register);
router.post("/userId", userController.userId);
router.get("/userDetails/:id", userController.userDetails);
router.get("/showProducts", productController.showProducts);
router.get("/productDetails/:id", productController.productDetails);
router.post('/addProducts', productController.addProducts);
router.put('/updateProducts/:id', productController.updateProducts);
router.get("/userCartDetails/:id", userController.userCartDetails);
router.post('/addProductWishList', wishListController.addProduct);
router.get('/getwishlist/:id', wishListController.getwishlist);
router.post('/updatecart/:id', cartController.updateCart);
router.get('/getcart/:userId', cartController.getCart); 
router.patch('/removeProduct', wishListController.removeProduct);
router.post('/getProductImage/', productController.getProductImage);
router.get('/getImage/', productController.getImage);
router.post('/addorder/:userId', OrderController.addOrder);
router.patch('/updateuser/:userId', userController.updateUser);
router.get('/getorder/:userId', OrderController.getOrder);
module.exports = router;

