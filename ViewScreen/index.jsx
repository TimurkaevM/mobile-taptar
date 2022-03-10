import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Auth from './Auth';
import Registration from './Registration';
import MyTopTabBar from './MyTopTabBar';

import { appStyles } from '../styles/appStyles';

function ViewScreen() {
  const Tab = createMaterialTopTabNavigator();

  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Auth"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12, color: '#ffffff' },
        tabBarStyle: {
          backgroundColor: 'rgba(35, 43, 85, 0.95)',
          marginTop: 30,
          borderWidth: 0,
        },
      }}
      // tabBar={(props) => <MyTopTabBar {...props} />}
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
    // </NavigationContainer>
  );
}

export default ViewScreen;
