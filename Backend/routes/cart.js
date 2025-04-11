const express = require('express');
const router = express.Router();
const { cartController } = require('../controllers/index');
const auth = require('../middlewares/auth');

router.post('/update/:id', cartController.updateCart);
router.get('/products/:userId', cartController.getCart); 

module.exports = router;
