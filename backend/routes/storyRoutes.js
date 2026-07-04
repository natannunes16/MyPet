const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');

router.get('/', storyController.getStories);
router.post('/', storyController.createStory);

module.exports = router;
