const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/channels', channelController.createChannel);
router.get('/channels/group/:groupId', channelController.getChannelsByGroupId);


module.exports = router;
