const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');
const passport = require('passport');
const forgotPasswordController = require('../controller/forgot_password_controller');

router.get('/profile' ,passport.checkAuthetication, userController.profile);


router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session',
passport.authenticate(
    'local', 
    { failureRedirect: '/users/sign-in' }
    ), userController.createSession);

// sign out
router.get('/destroy-session', userController.destroySession);


router.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/signIn'}), userController.createSession);


// forgot password route
router.use('/password', require('./passord-reset'));

module.exports = router;