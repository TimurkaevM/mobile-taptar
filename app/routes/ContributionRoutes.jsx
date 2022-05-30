import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileInfoScreen from '../screens/FileInfoScreen';
import FileTagsScreen from '../screens/FileTagsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialInfoScreen from '../screens/MaterialInfoScreen';
import ContributionMediasRoutes from './ContributionMediasRoutes';

const Stack = createStackNavigator();

function ContributionRoutes() {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="ContributionMediasRoutes"
        component={ContributionMediasRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MaterialInfoScreen"
        component={MaterialInfoScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FileTagsScreen"
        component={FileTagsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FileInfoScreen"
        component={FileInfoScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default ContributionRoutes;
