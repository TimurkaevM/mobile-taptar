import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../screens/ChatScreen';
import ContactsScreen from '../screens/ContactsScreen';

const Stack = createStackNavigator();

const config = {
  animation: 'timing',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function ChatRoutes() {
  return (
    <Stack.Navigator initialRouteName="ContactsScreen">
      <Stack.Screen
        name="ContactsScreen"
        component={ContactsScreen}
        options={{
          title: 'Контакты',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#4686cc',
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          title: 'Чат',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#4686cc',
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default ChatRoutes;
