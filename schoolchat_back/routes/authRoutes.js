const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/complete-registration', authController.completeRegistration);
router.post('/login', authController.login);

module.exports = router;