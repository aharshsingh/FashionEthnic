const express = require('express');
const router = express.Router();
const { OrderController } = require('../controllers/index');

router.post('/add_order/:userId', OrderController.addOrder);
router.get('/get_order/:userId', OrderController.getOrder);

module.exports = router;
