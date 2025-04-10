const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/index');

router.post("/addInfo", userController.register);
router.post("/userId", userController.userId);
router.get("/userDetails/:id", userController.userDetails);
router.patch('/updateuser/:userId', userController.updateUser);
router.get("/userCartDetails/:id", userController.userCartDetails);

module.exports = router;
