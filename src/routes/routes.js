const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const userService = require('../services/user');
const portfolioService = require('../services/portfolio');

//User Routes
router.post('/login', userService.login);
router.post('/signup', userService.signup);

//Portfolio routes
router.post('/portfolio/add', authenticate, portfolioService.addScript);

module.exports = router;