import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Auth from '../screens/AuthScreen';
import Registration from '../screens/RegistrationScreen';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StatusBar } from 'react-native';

function EntranceMainRoutes() {
  const Tab = createMaterialTopTabNavigator();

  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? getStatusBarHeight() : StatusBar.currentHeight;

  return (
    <Tab.Navigator
      initialRouteName="Auth"
      screenOptions={{
        tabBarActiveTintColor: '#4382c8',
        tabBarIndicatorStyle: {
          backgroundColor: '#4382c8',
        },
        tabBarLabelStyle: {
          fontSize: 14,
          textTransform: 'capitalize',
          fontFamily: 'GothamMedium',
        },
        tabBarStyle: {
          backgroundColor: '#f1f1f1',
          marginTop: STATUS_BAR_HEIGHT,
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

export default EntranceMainRoutes;
