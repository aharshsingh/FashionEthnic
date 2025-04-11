const express = require('express');
const router = express.Router();
const { OrderController } = require('../controllers/index');
const auth = require('../middlewares/auth');

router.post('/add_order/:userId', OrderController.addOrder);
router.get('/get_order/:userId', OrderController.getOrder);

module.exports = router;
