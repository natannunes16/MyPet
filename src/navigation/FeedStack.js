import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from '../screens/Feed/FeedScreen';
import CreatePostScreen from '../screens/Feed/CreatePostScreen';
import StoryScreen from '../screens/Feed/StoryScreen';
import CreateStoryScreen from '../screens/Feed/CreateStoryScreen';
import ImageCropScreen from '../screens/Feed/ImageCropScreen';
import CadastrarPetScreen from '../screens/CadastrarPet/CadastrarPetScreen';
import DetalheDoPetScreen from '../screens/DetalhePet/DetalheDoPetScreen'; // placeholder, create if missing

const Stack = createNativeStackNavigator();

export default function FeedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FeedHome" component={FeedScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="ImageCrop" component={ImageCropScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="Story" component={StoryScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="CreateStory" component={CreateStoryScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="CadastrarPet" component={CadastrarPetScreen} />
      <Stack.Screen name="DetalheDoPet" component={DetalheDoPetScreen} />
    </Stack.Navigator>
  );
}

