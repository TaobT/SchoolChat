const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController')

// Rutas de mensajes
router.post('/messages', messageController.createMessage);
router.get('/messages/channel/:channelId', messageController.getMessagesByChannel);
router.get('/messages/user/:userId', messageController.getMessagesByUser);

module.exports = router;