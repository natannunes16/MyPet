const express = require('express');
const router = express.Router();
const { getPosts, createPost, deletePost, commentOnPost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getPosts).post(protect, createPost);
router.route('/:id').delete(protect, deletePost);
router.route('/:id/comments').post(protect, commentOnPost);

module.exports = router;
