const Location = require('../models/Location');

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({ ownerId: req.user.id }).sort({ createdAt: -1 });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLocation = async (req, res) => {
  try {
    const { petId, petName, petPhoto, latitude, longitude, address, status, isLost, description } = req.body;
    
    // Check if location already exists for this pet
    let location = await Location.findOne({ petId });
    if (location) {
      location.latitude = latitude || location.latitude;
      location.longitude = longitude || location.longitude;
      location.address = address || location.address;
      location.status = status || location.status;
      location.isLost = isLost !== undefined ? isLost : location.isLost;
      location.description = description || location.description;
      location.lastSeenAt = new Date();
      await location.save();
      return res.status(200).json(location);
    }
    
    location = new Location({
      petId,
      ownerId: req.user.id,
      petName,
      petPhoto,
      latitude,
      longitude,
      address,
      status,
      isLost,
      description,
      lastSeenAt: new Date()
    });

    const createdLocation = await location.save();
    res.status(201).json(createdLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ message: 'Localização não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);

    if (location) {
      if (location.ownerId.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Não autorizado' });
      }

      location.status = req.body.status || location.status;
      location.isLost = req.body.isLost !== undefined ? req.body.isLost : location.isLost;
      location.latitude = req.body.latitude || location.latitude;
      location.longitude = req.body.longitude || location.longitude;
      location.address = req.body.address || location.address;
      location.description = req.body.description || location.description;
      
      const updatedLocation = await location.save();
      res.json(updatedLocation);
    } else {
      res.status(404).json({ message: 'Localização não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);

    if (location) {
      if (location.ownerId.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Não autorizado' });
      }

      await location.deleteOne();
      res.json({ message: 'Localização removida' });
    } else {
      res.status(404).json({ message: 'Localização não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLocations,
  createLocation,
  getLocationById,
  updateLocation,
  deleteLocation,
};
