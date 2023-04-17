const express = require('express');
const router = express.Router();
const passport = require('passport');
const forgotPasswordController = require('../controller/forgot_password_controller');


router.get('/forgot', forgotPasswordController.forgotPassword);
router.post('/reset', forgotPasswordController.passwordReset);
router.post('/change', forgotPasswordController.passwordChange);


module.exports = router;