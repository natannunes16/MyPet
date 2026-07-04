const express = require('express');
const router = express.Router();
const { getItems, createItem, getItemById } = require('../controllers/marketplaceController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getItems).post(protect, createItem);
router.route('/:id').get(getItemById);

module.exports = router;
