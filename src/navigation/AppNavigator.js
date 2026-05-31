import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '../screens/Auth/SplashScreen';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import AddFirstPetScreen from '../screens/Auth/AddFirstPetScreen';
import DetalheDoPetScreen from '../screens/DetalhePet/DetalheDoPetScreen';
import EditPetScreen from '../screens/EditPet/EditPetScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
import TabNavigator from './TabNavigator';
import ImageCropScreen from '../screens/Feed/ImageCropScreen';
import ModoPerdidoScreen from '../screens/Localization/ModoPerdidoScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        {/* Auth Flow */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="AddFirstPet" component={AddFirstPetScreen} />
        
        <Stack.Screen name="DetalheDoPet" component={DetalheDoPetScreen} />
        <Stack.Screen name="EditPet" component={EditPetScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="ImageCrop" component={ImageCropScreen} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="ModoPerdido" component={ModoPerdidoScreen} options={{ animation: 'slide_from_bottom' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
