const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');

//API for the server
router.post("/register", userController.register);
router.get("/userInfo/:email", userController.userInfo);
router.get("/showProducts", productController.showProducts);
router.get("/productDetails/:id", productController.productDetails);
router.post('/addProducts',productController.addProducts);
router.put('/updateProducts/:id',productController.updateProducts);
router.get("/userCartDetails/:id", userController.userCartDetails);
module.exports = router;

