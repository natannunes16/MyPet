const Pet = require('../models/Pet');

const getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserPets = async (req, res) => {
  try {
    const pets = await Pet.find({ ownerId: req.user.id });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: 'Pet não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPet = async (req, res) => {
  try {
    const { name, species, breed, age, gender, image } = req.body;
    
    const pet = new Pet({
      name,
      species,
      breed,
      age,
      gender,
      image,
      ownerId: req.user.id,
    });

    const createdPet = await pet.save();
    res.status(201).json(createdPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (pet) {
      if (pet.ownerId.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Não autorizado' });
      }

      pet.name = req.body.name || pet.name;
      pet.species = req.body.species || pet.species;
      pet.breed = req.body.breed || pet.breed;
      pet.age = req.body.age || pet.age;
      pet.gender = req.body.gender || pet.gender;
      pet.image = req.body.image || pet.image;

      const updatedPet = await pet.save();
      res.json(updatedPet);
    } else {
      res.status(404).json({ message: 'Pet não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (pet) {
      if (pet.ownerId.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Não autorizado' });
      }

      await pet.deleteOne();
      res.json({ message: 'Pet removido' });
    } else {
      res.status(404).json({ message: 'Pet não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPets,
  getUserPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};
