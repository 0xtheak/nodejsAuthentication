const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

// home route
router.get('/', homeController.home);
// user routes
router.use('/users', require('./users'));

module.exports = router;