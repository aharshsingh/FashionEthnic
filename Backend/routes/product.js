const express = require('express');
const router = express.Router();
const { productController } = require('../controllers/index');
const auth = require('../middlewares/auth');

router.get("/get_products", productController.showProducts);
router.get("/detail/:id", productController.productDetails);
router.post('/get_product_image', productController.getProductImage);
router.get('/get_image/:id', productController.getImage);

module.exports = router;
