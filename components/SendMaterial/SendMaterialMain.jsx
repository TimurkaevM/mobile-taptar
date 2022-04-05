import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeText, changeTitle } from '../../redux/ducks/files';
import AddFileButton from './AddFileButton';
import { Video } from 'expo-av';

import { sendMaterialStyles } from '../../styles/sendMaterialStyles';

function SendMaterialMain(props) {
  const { navigate, push } = props.navigation;

  const dispatch = useDispatch();

  const files = useSelector((state) => state.files.files);

  const [modalVisible, setModalVisible] = useState(false);

  const openModalAddFile = () => {
    setModalVisible(true);
  };

  const title = useSelector((state) => state.files.materials.title);
  const text = useSelector((state) => state.files.materials.text);
  const photo = useSelector((state) => state.files.materials.photo.one);
  const video = useSelector((state) => state.files.materials.video.one);

  console.log(photo);

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
          uri: `https://api.taptar.ru/storage/${item.path}`,
        }}
      />
    </View>
  );

  const renderVideo = ({ item }) => (
    <View style={sendMaterialStyles.mediaBox}>
      <Video
        style={sendMaterialStyles.mediaImage}
        source={{
          uri: `https://api.taptar.ru/storage/${item.path}`,
        }}
        useNativeControls={false}
        resizeMode="cover"
        // isLooping
      />
    </View>
  );

  return (
    <ScrollView>
      <View style={sendMaterialStyles.inputTitleContainer}>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 10,
            textTransform: 'uppercase',
            fontWeight: '400',
            fontSize: 15,
          }}
        >
          Название материала
        </Text>
        <TextInput
          style={sendMaterialStyles.inputTitle}
          type="password"
          name="title"
          value={title}
          placeholder="Введите название"
          onChange={handleChangeTitle}
        />
      </View>

      <View style={sendMaterialStyles.inputTitleContainer}>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 10,
            textTransform: 'uppercase',
            fontWeight: '400',
            fontSize: 15,
          }}
        >
          Текст материала
        </Text>
        <TextInput
          multiline
          numberOfLines={7}
          style={sendMaterialStyles.inputText}
          type="password"
          name="title"
          value={text.text}
          placeholder="Введите текст"
          onChange={handleChangeText}
        />
      </View>

      <AddFileButton
        push={push}
        navigate={navigate}
        openModalAddFile={openModalAddFile}
      />

      {photo.length ? (
        <View style={sendMaterialStyles.inputTitleContainer}>
          <Text
            style={{
              textAlign: 'left',
              borderBottomWidth: 1,
              paddingBottom: 3,
              marginBottom: 10,
              textTransform: 'uppercase',
              fontWeight: '400',
              fontSize: 15,
            }}
          >
            Фото
          </Text>
          <FlatList
            horizontal
            data={photo}
            renderItem={renderImage}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      ) : null}

      {video.length ? (
        <View style={sendMaterialStyles.inputTitleContainer}>
          <Text
            style={{
              textAlign: 'left',
              borderBottomWidth: 1,
              paddingBottom: 3,
              marginBottom: 10,
              textTransform: 'uppercase',
              fontWeight: '400',
              fontSize: 15,
            }}
          >
            Видео
          </Text>
          <FlatList
            horizontal
            data={video}
            renderItem={renderVideo}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}

export default SendMaterialMain;
