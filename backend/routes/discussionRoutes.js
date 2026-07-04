const express = require('express');
const router = express.Router();
const { getDiscussions, createDiscussion, getDiscussionById, deleteDiscussion } = require('../controllers/discussionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getDiscussions).post(protect, createDiscussion);
router.route('/:id').get(getDiscussionById).delete(protect, deleteDiscussion);

module.exports = router;
