const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/index');
const auth = require('../middlewares/auth');

router.post("/addInfo", userController.register);
router.post("/userId", userController.userId);
router.get("/userDetails/:id", userController.userDetails);
router.patch('/update/:userId', userController.updateUser);
router.get("/cart/:id", userController.userCartDetails);

module.exports = router;
