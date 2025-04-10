const express = require('express');
const router = express.Router();
const { registerController, loginController, adminRegisterController, logoutController } = require('../controllers');

router.post("/signup", registerController.signup);
router.post("/signin", loginController.login);
router.post("/admin_register", adminRegisterController.adminRegister);
router.post("/logout", logoutController.logout);
router.post("/forgot_password", loginController.forgotPassword);
router.patch("/reset_password", loginController.resetPassword);

module.exports = router;
