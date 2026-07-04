import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [animals, setAnimals] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await api.get('/marketplace');
      const items = res.data || [];
      
      setAnimals(items.filter(item => item.type === 'Animal'));
      setProducts(items.filter(item => item.type === 'Produto'));
      setServices(items.filter(item => item.type === 'Serviço'));
    } catch (error) {
      console.warn('Failed to fetch marketplace items', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addAd = async (type, ad) => {
    try {
      // Backend expects type to be part of the payload
      const payload = { ...ad, type };
      await api.post('/marketplace', payload);
      await fetchItems();
    } catch (error) {
      console.warn('Failed to add marketplace item', error);
      throw error;
    }
  };

  return (
    <MarketplaceContext.Provider value={{ animals, products, services, addAd, loading, fetchItems }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => useContext(MarketplaceContext);
