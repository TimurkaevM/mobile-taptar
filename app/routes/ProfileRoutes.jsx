import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileChangeScreen from '../screens/ProfileChangeScreen';
import ProfileScreen from '../screens/ProfileScreen';

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

function ProfileRoutes() {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Профиль',
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

export default ProfileRoutes;
