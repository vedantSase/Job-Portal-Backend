const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');


//  Register User Route
router.post('/register', authController.registerUser);


// login User Route
router.post('/login', authController.loginUser);

module.exports = router; 