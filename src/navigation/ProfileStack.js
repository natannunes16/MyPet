import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import MeusPerfilScreen from '../screens/Profile/MeusPerfilScreen';
import EditarPerfilScreen from '../screens/Profile/EditarPerfilScreen';
import ConfiguracoesScreen from '../screens/Profile/ConfiguracoesScreen';
import AlterarSenhaScreen from '../screens/Profile/AlterarSenhaScreen';
import PrivacidadeScreen from '../screens/Profile/PrivacidadeScreen';
import DiretrizesComunidadeScreen from '../screens/Profile/DiretrizesComunidadeScreen';
import StoriesScreen from '../screens/Profile/StoriesScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MeusPerfil" component={MeusPerfilScreen} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
      <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />
      <Stack.Screen name="AlterarSenha" component={AlterarSenhaScreen} />
      <Stack.Screen name="Privacidade" component={PrivacidadeScreen} />
      <Stack.Screen name="DiretrizesComunidade" component={DiretrizesComunidadeScreen} />
      <Stack.Screen name="Stories" component={StoriesScreen} />
    </Stack.Navigator>
  );
}
