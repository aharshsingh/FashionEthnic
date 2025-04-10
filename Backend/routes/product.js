const express = require('express');
const router = express.Router();
const { productController } = require('../controllers/index');

router.get("/get_products", productController.showProducts);
router.get("/detail/:id", productController.productDetails);
router.put('/updateProducts/:id', productController.updateProducts);
router.post('/getProductImage/', productController.getProductImage);
router.get('/getImage/:id', productController.getImage);

module.exports = router;
