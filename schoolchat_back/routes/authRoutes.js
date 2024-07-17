const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController')

// Rutas de autenticación
router.post('/register', authController.register);
router.post('/verify-token', authController.verifyToken);
router.post('/complete-registration', authController.completeRegistration);
router.post('/login', authController.login);
router.get('/user', authController.getUserInfo);

// Rutas de mensajes
router.post('/messages', messageController.createMessage);
router.get('/messages/channel/:channelId', messageController.getMessagesByChannel);
router.get('/messages/user/:userId', messageController.getMessagesByUser);

module.exports = router;