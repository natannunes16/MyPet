import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscussionsScreen from '../screens/Discussions/DiscussionsScreen';
import DiscussionDetailScreen from '../screens/Discussions/DiscussionDetailScreen';
import CreateDiscussionScreen from '../screens/Discussions/CreateDiscussionScreen';

const Stack = createNativeStackNavigator();

export default function DiscussionsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DiscussionsList" component={DiscussionsScreen} />
      <Stack.Screen name="DiscussionDetail" component={DiscussionDetailScreen} />
      <Stack.Screen name="CreateDiscussion" component={CreateDiscussionScreen} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
}
