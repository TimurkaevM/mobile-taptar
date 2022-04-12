import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDraftFiles } from '../../redux/ducks/files';
import AddFileScreen from './AddFileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SendMaterialMain from './SendMaterialMain';
import ImageBrowserScreen from './ImageBrowserScreen';

const Stack = createStackNavigator();

function SendMaterial() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDraftFiles());
  }, [dispatch]);

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={SendMaterialMain}
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
        component={AddFileScreen}
        options={{
          title: 'Настройка принадлежностей',
          headerStyle: {
            backgroundColor: '#4686cc',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

export default SendMaterial;
