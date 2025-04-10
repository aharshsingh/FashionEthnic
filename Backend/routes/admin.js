const express = require('express');
const router = express.Router();
const { adminController } = require('../controllers/index');
const admin = require('../middlewares/admin');

router.get('/users', adminController.getAllUser);
router.get('/orders', adminController.getAllOrder);
router.post('/add_product', adminController.addProducts);

module.exports = router;
