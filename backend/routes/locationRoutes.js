const express = require('express');
const router = express.Router();
const { getLocations, createLocation, getLocationById, updateLocation, deleteLocation } = require('../controllers/locationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getLocations).post(protect, createLocation);
router.route('/:id').get(protect, getLocationById).put(protect, updateLocation).delete(protect, deleteLocation);

module.exports = router;
