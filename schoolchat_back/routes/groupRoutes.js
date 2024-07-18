// routes/groupRoutes.js
const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/create', groupController.createGroup);
router.post('/join', groupController.joinGroup);
router.get('/:groupId', groupController.getGroup);
router.get('/', groupController.listAllGroups);

module.exports = router;
