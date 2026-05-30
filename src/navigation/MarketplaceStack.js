import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarketplaceScreen from '../screens/Marketplace/MarketplaceScreen';
import MarketplaceAnimaisScreen from '../screens/Marketplace/MarketplaceAnimaisScreen';
import MarketplaceProdutosScreen from '../screens/Marketplace/MarketplaceProdutosScreen';
import CriarAnuncioScreen from '../screens/Marketplace/CriarAnuncioScreen';
import DetalheDoAnuncioScreen from '../screens/Marketplace/DetalheDoAnuncioScreen';

const Stack = createNativeStackNavigator();

export default function MarketplaceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MarketplaceHome" component={MarketplaceScreen} />
      <Stack.Screen name="MarketplaceAnimais" component={MarketplaceAnimaisScreen} />
      <Stack.Screen name="MarketplaceProdutos" component={MarketplaceProdutosScreen} />
      <Stack.Screen name="CriarAnuncio" component={CriarAnuncioScreen} />
      <Stack.Screen name="DetalheDoAnuncio" component={DetalheDoAnuncioScreen} />
    </Stack.Navigator>
  );
}
