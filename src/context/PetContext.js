import React, { createContext, useContext, useState, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const STORAGE_KEY = '@myPetPets';

// Create the context
const PetContext = createContext();

export const PetProvider = ({ children }) => {
  // Profile state 
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatar: '',
  });

  // Pets owned by the user
  const [pets, setPets] = useState([]);
  const [loadingPets, setLoadingPets] = useState(false);

  const fetchPets = async () => {
    try {
      setLoadingPets(true);
      const res = await api.get('/pets/my-pets');
      setPets(res.data || []);
    } catch (e) {
      console.warn('Failed to fetch pets', e);
    } finally {
      setLoadingPets(false);
    }
  };

  // Load profile and pets when the app starts
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('@myPetToken');
        if (token) {
          const res = await api.get('/auth/profile');
          if (res.data) {
            setProfile(res.data);
            fetchPets(); // fetch pets only if user is logged in
          }
        }
      } catch (e) {
        console.warn('Failed to load profile', e);
      }
    };
    
    loadProfile();
  }, []);

  // Update profile fields (local only)
  const updateProfile = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
    fetchPets(); // after profile is set (e.g. login), fetch their pets
    DeviceEventEmitter.emit('profileUpdated');
  };

  // Update profile in backend
  const updateUserProfile = async (updates) => {
    try {
      const res = await api.put('/auth/profile', updates);
      if (res.data) {
        setProfile(res.data);
        DeviceEventEmitter.emit('profileUpdated');
      }
    } catch (e) {
      console.warn('Failed to update user profile in backend', e);
      throw e;
    }
  };

  // Add a new pet
  const addPet = async (pet) => {
    try {
      await api.post('/pets', pet);
      await fetchPets();
    } catch (e) {
      console.warn('Failed to add pet', e);
      throw e;
    }
  };

  // Update an existing pet by its id
  const updatePet = async (id, updatedPet) => {
    try {
      await api.put(`/pets/${id}`, updatedPet);
      await fetchPets();
    } catch (e) {
      console.warn('Failed to update pet', e);
      throw e;
    }
  };

  // Delete a pet by its id
  const deletePet = async (id) => {
    try {
      await api.delete(`/pets/${id}`);
      await fetchPets();
    } catch (e) {
      console.warn('Failed to delete pet', e);
      throw e;
    }
  };

  // Clear all pets (e.g. on new registration/logout)
  const clearPets = () => {
    setPets([]);
  };

  return (
    <PetContext.Provider
      value={{ profile, updateProfile, updateUserProfile, pets, loadingPets, fetchPets, addPet, updatePet, deletePet, clearPets }}
    >
      {children}
    </PetContext.Provider>
  );
};

// Custom hook for easy access
export const usePet = () => useContext(PetContext);
