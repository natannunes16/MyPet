import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { PetProvider } from './src/context/PetContext';
import { FeedProvider } from './src/context/FeedContext';
export default function App() {
  return (
    <SafeAreaProvider>
      <PetProvider>
        <FeedProvider>
          <AppNavigator />
        </FeedProvider>
      </PetProvider>
    </SafeAreaProvider>
  );
}

