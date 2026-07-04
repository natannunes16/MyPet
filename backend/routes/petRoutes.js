const express = require('express');
const router = express.Router();
const { getPets, getUserPets, getPetById, createPet, updatePet, deletePet } = require('../controllers/petController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getPets).post(protect, createPet);
router.route('/my-pets').get(protect, getUserPets);
router.route('/:id').get(getPetById).put(protect, updatePet).delete(protect, deletePet);

module.exports = router;
