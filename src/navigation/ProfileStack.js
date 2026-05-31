import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import MeusPerfilScreen from '../screens/Profile/MeusPerfilScreen';
import EditarPerfilScreen from '../screens/Profile/EditarPerfilScreen';
import ConfiguracoesScreen from '../screens/Profile/ConfiguracoesScreen';
import AlterarSenhaScreen from '../screens/Profile/AlterarSenhaScreen';
import AlterarEmailScreen from '../screens/Profile/AlterarEmailScreen';
import MeusAnunciosScreen from '../screens/Profile/MeusAnunciosScreen';
import PrivacidadeScreen from '../screens/Profile/PrivacidadeScreen';
import DiretrizesComunidadeScreen from '../screens/Profile/DiretrizesComunidadeScreen';
import StoriesScreen from '../screens/Profile/StoriesScreen';
import ImageCropScreen from '../screens/Feed/ImageCropScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MeusPerfil" component={MeusPerfilScreen} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
      <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />
      <Stack.Screen name="AlterarEmail" component={AlterarEmailScreen} />
      <Stack.Screen name="AlterarSenha" component={AlterarSenhaScreen} />
      <Stack.Screen name="MeusAnuncios" component={MeusAnunciosScreen} />
      <Stack.Screen name="Privacidade" component={PrivacidadeScreen} />
      <Stack.Screen name="DiretrizesComunidade" component={DiretrizesComunidadeScreen} />
      <Stack.Screen name="Stories" component={StoriesScreen} />
      <Stack.Screen name="ImageCrop" component={ImageCropScreen} options={{ animation: 'slide_from_bottom' }} />
    </Stack.Navigator>
  );
}
