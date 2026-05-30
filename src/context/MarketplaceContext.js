import React, { createContext, useContext, useState } from 'react';
import { mockAnimals, mockProducts, mockServices } from '../mocks/marketplaceMocks';

const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [animals, setAnimals] = useState(mockAnimals);
  const [products, setProducts] = useState(mockProducts);
  const [services, setServices] = useState(mockServices);

  const addAd = (type, ad) => {
    if (type === 'Animal') {
      setAnimals(prev => [ad, ...prev]);
    } else if (type === 'Produto') {
      setProducts(prev => [ad, ...prev]);
    } else if (type === 'Serviço') {
      setServices(prev => [ad, ...prev]);
    }
  };

  return (
    <MarketplaceContext.Provider value={{ animals, products, services, addAd }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => useContext(MarketplaceContext);
