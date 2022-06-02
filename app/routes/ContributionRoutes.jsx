import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileInfoScreen from '../screens/FileInfoScreen';
import FileTagsScreen from '../screens/FileTagsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialInfoScreen from '../screens/MaterialInfoScreen';
import ContributionMediasRoutes from './ContributionMediasRoutes';
import { getReadyMaterial } from '../redux/ducks/contributionMaterial';
import { getPhoto } from '../redux/ducks/contributionPhoto';
import { getDocument } from '../redux/ducks/contributionDocument';
import { getVideo } from '../redux/ducks/contributionVideo';
import { getAudio } from '../redux/ducks/contributionAudio';
// import { getAudio, getDocument, getPhoto, getReadyMaterial, getVideo } from '../redux/ducks/contribution';

const Stack = createStackNavigator();

function ContributionRoutes() {
  const dispatch = useDispatch();
  
    React.useEffect(() => {
    dispatch(getReadyMaterial());
    dispatch(getPhoto());
    dispatch(getVideo());
    dispatch(getDocument());
    dispatch(getAudio());
  }, [dispatch]);

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
