const express = require('express');
const router = express.Router();
const { wishListController } = require('../controllers/index');
const auth = require('../middlewares/auth');

router.post('/add_product', wishListController.addProduct);
router.get('/products/:id', wishListController.getwishlist);
router.patch('/remove_product', wishListController.removeProduct);

module.exports = router;
