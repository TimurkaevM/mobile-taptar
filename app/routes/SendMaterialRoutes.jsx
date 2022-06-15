import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTagsScreen from '../screens/AddTagsScreen';
import ChangeTagsScreen from '../screens/ChangeTagsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import FormSend from '../screens/SendMaterialScreen';
import ImageBrowserScreen from '../screens/ImageBrowserScreen';
import AudioListScreen from '../screens/AudioListScreen';
import PdfReaderScreen from '../screens/PdfReaderScreen';
import { getDraftFiles } from '../redux/actions/material';

const Stack = createStackNavigator();

function SendMaterialRoutes() {
  const dispatch = useDispatch();

  const draftError = useSelector((state) => state.sendMaterial.draftError);

  useEffect(() => {
    dispatch(getDraftFiles());
  }, [dispatch, draftError]);

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={FormSend}
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeTagsScreen"
        component={ChangeTagsScreen}
        options={{
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
    </Stack.Navigator>
  );
}

export default SendMaterialRoutes;
