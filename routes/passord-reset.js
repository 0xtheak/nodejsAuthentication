const express = require('express');
const router = express.Router();
const passport = require('passport');
const forgotPasswordController = require('../controller/forgot_password_controller');

// password forgot route
router.get('/forgot', forgotPasswordController.forgotPassword);
// password reset route
router.post('/reset', forgotPasswordController.passwordReset);
// password change route
router.post('/change', forgotPasswordController.passwordChange);


module.exports = router;