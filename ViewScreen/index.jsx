import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Auth from './Auth';
import Registration from './Registration';

function ViewScreen() {
  const Tab = createMaterialTopTabNavigator();

  return (
    // <NavigationContainer>
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
