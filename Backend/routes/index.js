const express = require('express');
const router = express.Router();
const {adminRegisterController, loginController, registerController, adminController, productController, userController, wishListController } = require('../controllers/index')
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.post("/register", registerController.register);
router.post("/register", loginController.login);
router.post("/adminRegister", adminRegisterController.adminRegister);
router.post("/addInfo", userController.register);
router.get("/userInfo/:email", userController.userInfo);
router.get("/showProducts", productController.showProducts);
router.get("/productDetails/:id", productController.productDetails);
router.post('/addProducts', productController.addProducts);
router.put('/updateProducts/:id', productController.updateProducts);
router.get("/userCartDetails/:id", userController.userCartDetails);
router.post('/addProductWishList', wishListController.addProduct);
module.exports = router;

