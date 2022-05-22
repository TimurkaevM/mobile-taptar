import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Auth from '../screens/AuthScreen';
import Registration from '../screens/RegistrationScreen';

function EntranceRoutes() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Auth"
      screenOptions={{
        tabBarActiveTintColor: '#4382c8',
        tabBarLabelStyle: { fontSize: 14, textTransform: 'capitalize' },
        tabBarStyle: {
          backgroundColor: '#f1f1f1',
          marginTop: 30,
          borderWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Auth"
        component={Auth}
        options={{ tabBarLabel: 'Авторизация' }}
      />
      <Tab.Screen
        name="Registration"
        component={Registration}
        options={{ tabBarLabel: 'Регистрация' }}
      />
    </Tab.Navigator>
  );
}

export default EntranceRoutes;
