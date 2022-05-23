import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTagsScreen from '../screens/AddTagsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ImageBrowserScreen from '../screens/ImageBrowserScreen';
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
        component={ImageBrowserScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FileInfoScreen"
        component={AddTagsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default ContributionRoutes;
