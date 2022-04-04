import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { changeText, changeTitle, getDraftFiles } from '../../redux/ducks/files';
import AddFileButton from './AddFileButton';
import AddFileScreen from './AddFileScreen';
import { Video } from 'expo-av';
import {createStackNavigator} from '@react-navigation/stack';
import SendMaterialMain from './SendMaterialMain';
import ImageBrowserScreen from './ImageBrowserScreen';

import { sendMaterialStyles } from '../../styles/sendMaterialStyles';

const Stack = createStackNavigator();

function SendMaterial() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDraftFiles())
  }, [dispatch]);

  return (
    <Stack.Navigator initialRouteName='Main'>
      <Stack.Screen 
        name='Main' 
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
        name='ImageBrowserScreen'
        component={ImageBrowserScreen}
        options={{
          headerShown: false
        }}
        // options={{
        //   title: 'Selected 0 files',
        // }}
      />
      <Stack.Screen
        name='ModalAddFile'
        component={AddFileScreen}
        options={{
          title: 'Настройка принадлежностей',
        }}
      />
    </Stack.Navigator>
  );
}

export default SendMaterial;
