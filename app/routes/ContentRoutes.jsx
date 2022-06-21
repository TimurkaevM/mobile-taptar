import React from 'react';
import AddTagsScreen from '../screens/AddTagsScreen';
import ChangeTagsScreen from '../screens/ChangeTagsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ImageBrowserScreen from '../screens/ImageBrowserScreen';
import AudioListScreen from '../screens/AudioListScreen';
import PdfReaderScreen from '../screens/PdfReaderScreen';
import MainRoutes from './MainRoutes';
import MaterialInfoScreen from '../screens/MaterialInfoScreen';
import FileTagsScreen from '../screens/FileTagsScreen';
import FileInfoScreen from '../screens/FileInfoScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileChangeScreen from '../screens/ProfileChangeScreen';
import ChangeHistorianTagsScreen from '../screens/ChangeHistorianTagsScreen';
import { useSelector } from 'react-redux';

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

function ContentRoutes() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const { role } = currentUser;

  return (
    <Stack.Navigator initialRouteName="MainRoutes">
      <Stack.Screen
        name="MainRoutes"
        component={MainRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ImageBrowserScreen"
        component={ImageBrowserScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ModalAddFile"
        component={AddTagsScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeTagsScreen"
        component={
          role === 'user' ? ChangeTagsScreen : ChangeHistorianTagsScreen
        }
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PdfReaderScreen"
        component={PdfReaderScreen}
        options={{
          title: 'PDF файл',
          headerStyle: {
            backgroundColor: '#4686cc',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="AudioListScreen"
        component={AudioListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
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
      <Stack.Screen
        name="ProfileChangeScreen"
        component={ProfileChangeScreen}
        options={{
          title: 'Редактировать профиль',
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

export default ContentRoutes;
