import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDraftFiles } from '../redux/ducks/files';
import TagsScreen from '../screens/AddTagsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import FormSend from '../screens/SendMaterialScreen';
import ImageBrowserScreen from '../screens/ImageBrowserScreen';
import AudioListScreen from '../screens/AudioListScreen';

const Stack = createStackNavigator();

function SendMaterialRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDraftFiles());
  }, [dispatch]);

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={FormSend}
        options={{
          title: 'Форма настройки материала',
          headerStyle: {
            backgroundColor: '#4686cc',
          },
          headerTintColor: '#fff',
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
        component={TagsScreen}
        options={{
          title: 'Настройка принадлежностей',
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
          title: 'Список аудио',
          headerStyle: {
            backgroundColor: '#4686cc',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

export default SendMaterialRoutes;