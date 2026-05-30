import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

import FeedStack from '../navigation/FeedStack';
import DiscussionsStack from '../navigation/DiscussionsStack';
import MarketplaceStack from '../navigation/MarketplaceStack';
import LocalizationScreen from '../screens/Localization/LocalizationScreen';
import ProfileStack from '../navigation/ProfileStack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: { paddingBottom: 5, paddingTop: 5, backgroundColor: colors.background },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Discussões') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Marketplace') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Localizar') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedStack} options={{ headerShown: false }} />
      <Tab.Screen name="Discussões" component={DiscussionsStack} />
      <Tab.Screen name="Marketplace" component={MarketplaceStack} />
      <Tab.Screen name="Localizar" component={LocalizationScreen} />
      <Tab.Screen name="Perfil" component={ProfileStack} />
    </Tab.Navigator>
  );
}
