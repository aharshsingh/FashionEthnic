const express = require('express');
const router = express.Router();
const { wishListController } = require('../controllers/index');

router.post('/addProductWishList', wishListController.addProduct);
router.get('/getwishlist/:id', wishListController.getwishlist);
router.patch('/removeProduct', wishListController.removeProduct);

module.exports = router;
