import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { changeText, changeTitle, getDraftFiles } from '../../redux/ducks/files';
import AddFileButton from './AddFileButton';
import ModalAddFile from './ModalAddFile';
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
  }, [dispatch])

  const files = useSelector((state) => state.files.files);

  const [modalVisible, setModalVisible] = useState(false);

  const openModalAddFile = () => {
    setModalVisible(true);
  };

  const title = useSelector((state) => state.files.materials.title);
  const text = useSelector((state) => state.files.materials.text);
  const photo = useSelector((state) => state.files.materials.photo.group);
  const video = useSelector((state) => state.files.materials.video.one);

  const handleChangeTitle = (event) => {
    dispatch(changeTitle(event.nativeEvent.text));
  };

  const handleChangeText = (event) => {
    dispatch(changeText(event.nativeEvent.text));
  };

  const renderImage = ({ item }) => (
    <View style={sendMaterialStyles.mediaBox}>
      <Image
        style={sendMaterialStyles.mediaImage}
        source={{
          uri: `http://api.taptar.ru/storage/${item.path}`,
        }}
      />
    </View>
  );

  const renderVideo = ({ item }) => (
    <View style={sendMaterialStyles.mediaBox}>
      <Video
        style={sendMaterialStyles.mediaImage}
        source={{
          uri: `http://api.taptar.ru/storage/${item.path}`,
        }}
        // useNativeControls
        resizeMode="cover"
        // isLooping
      />
    </View>
  );


  return (
    <Stack.Navigator initialRouteName='Main'>
      <Stack.Screen 
        name='Main' 
        component={SendMaterialMain}
        options={{
          title: 'Форма настройки материала',
        }}
      />
      <Stack.Screen
        name='ImageBrowserScreen'
        component={ImageBrowserScreen}
        options={{
          title: 'Selected 0 files',
        }}
      />
      <Stack.Screen
        name='ModalAddFile'
        component={ModalAddFile}
        options={{
          title: 'Настройка принадлежностей',
        }}
      />
    </Stack.Navigator>
  );
}

export default SendMaterial;
