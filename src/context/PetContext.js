import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@myPetPets';

// Create the context
const PetContext = createContext();

export const PetProvider = ({ children }) => {
  // Profile state (default placeholder values)
  const [profile, setProfile] = useState({
    name: 'Natan',
    email: 'natan@example.com',
    password: 'senha.secreta',
    avatar: 'https://via.placeholder.com/150',
  });

  // Pets owned by the user
  const [pets, setPets] = useState([]);

  // Load pets from async storage when the app starts
  useEffect(() => {
    const loadPets = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setPets(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('Failed to load pets', e);
      }
    };
    loadPets();
  }, []);

  // Persist pets whenever they change
  useEffect(() => {
    const savePets = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
      } catch (e) {
        console.warn('Failed to save pets', e);
      }
    };
    savePets();
  }, [pets]);

  // Update profile fields
  const updateProfile = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  // Add a new pet
  const addPet = (pet) => {
    setPets((prev) => [...prev, pet]);
  };

  // Update an existing pet by its index
  const updatePet = (index, updatedPet) => {
    setPets((prev) => prev.map((p, i) => (i === index ? updatedPet : p)));
  };

  // Delete a pet by its index
  const deletePet = (index) => {
    setPets((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear all pets (e.g. on new registration/logout)
  const clearPets = () => {
    setPets([]);
  };

  return (
    <PetContext.Provider
      value={{ profile, updateProfile, pets, addPet, updatePet, deletePet, clearPets }}
    >
      {children}
    </PetContext.Provider>
  );
};

// Custom hook for easy access
export const usePet = () => useContext(PetContext);
