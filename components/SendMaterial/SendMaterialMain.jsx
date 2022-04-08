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
import Svg, { Path, G } from 'react-native-svg';

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
  const videos = useSelector((state) => state.files.materials.video.group);

  console.log(videos);

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

  const renderVideos = ({ item }) => (
    <View style={sendMaterialStyles.mediaBox}>
      <Video
        style={sendMaterialStyles.mediaImage}
        source={{
          uri: `https://api.taptar.ru/storage/${item.files[0].path}`,
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
            textAlign: 'left',
            marginBottom: 10,
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
            textAlign: 'left',
            marginBottom: 10,
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
      {videos.length ? (
        <View style={sendMaterialStyles.inputTitleContainer}>
          <Text
            style={{
              textAlign: 'left',
              borderBottomWidth: 1,
              paddingBottom: 3,
              marginBottom: 10,
              fontWeight: '400',
              fontSize: 15,
            }}
          >
            Видео (группа файлов)
          </Text>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            space="preserve"
            width="28px"
            height="23px"
            version="1.1"
            style={{
              shapeRendering: 'geometricPrecision',
              textRendering: 'geometricPrecision',
              imageRendering: 'optimizeQuality',
              fillRule: 'evenodd',
              clipRule: 'evenodd',
            }}
            viewBox="0 0 56.69 48.97"
            xlink="http://www.w3.org/1999/xlink"
            xodm="http://www.corel.com/coreldraw/odm/2003"
          >
            <G id="Слой_x0020_1">
              <Path
                fill="#fff"
                d="M15.52 42.81l0 -14.66c0,-0.5 0.18,-0.92 0.55,-1.29 0.36,-0.36 0.79,-0.54 1.29,-0.54l21.99 0c0.5,0 0.92,0.18 1.29,0.54 0.36,0.36 0.54,0.79 0.54,1.29l0 14.66c0,0.5 -0.18,0.93 -0.54,1.29 -0.36,0.36 -0.79,0.54 -1.29,0.54l-21.99 0c-0.5,0 -0.92,-0.18 -1.29,-0.54 -0.36,-0.36 -0.55,-0.79 -0.55,-1.29zm29.32 -14.66c0,-0.5 0.18,-0.92 0.55,-1.29 0.36,-0.36 0.79,-0.54 1.29,-0.54l3.66 0c0.5,0 0.93,0.18 1.29,0.54 0.36,0.36 0.54,0.79 0.54,1.29l0 3.67c0,0.5 -0.18,0.93 -0.54,1.29 -0.36,0.36 -0.79,0.54 -1.29,0.54l-3.66 0c-0.5,0 -0.93,-0.18 -1.29,-0.54 -0.36,-0.36 -0.55,-0.79 -0.55,-1.29l0 -3.67zm11.85 15.69l0 -38.7c0,-2.83 -2.3,-5.13 -5.13,-5.13l-46.42 0c-2.83,0 -5.13,2.3 -5.13,5.13l0 38.7c0,2.84 2.3,5.14 5.13,5.14l46.42 0c2.83,0 5.13,-2.3 5.13,-5.14zm-44.84 -37.68l0 3.66c0,0.5 -0.18,0.93 -0.54,1.29 -0.36,0.36 -0.79,0.55 -1.29,0.55l-3.66 0c-0.5,0 -0.93,-0.18 -1.29,-0.55 -0.36,-0.36 -0.54,-0.79 -0.54,-1.29l0 -3.66c0,-0.5 0.18,-0.92 0.54,-1.29 0.36,-0.36 0.79,-0.54 1.29,-0.54l3.66 0c0.5,0 0.92,0.18 1.29,0.54 0.36,0.36 0.54,0.79 0.54,1.29zm0 11l0 3.66c0,0.5 -0.18,0.92 -0.54,1.29 -0.36,0.36 -0.79,0.54 -1.29,0.54l-3.66 0c-0.5,0 -0.93,-0.18 -1.29,-0.54 -0.36,-0.36 -0.54,-0.79 -0.54,-1.29l0 -3.66c0,-0.5 0.18,-0.93 0.54,-1.29 0.36,-0.36 0.79,-0.55 1.29,-0.55l3.66 0c0.5,0 0.92,0.18 1.29,0.55 0.36,0.36 0.54,0.79 0.54,1.29zm0 10.99l0 3.67c0,0.5 -0.18,0.93 -0.54,1.29 -0.36,0.36 -0.79,0.54 -1.29,0.54l-3.66 0c-0.5,0 -0.93,-0.18 -1.29,-0.54 -0.36,-0.36 -0.54,-0.79 -0.54,-1.29l0 -3.67c0,-0.5 0.18,-0.92 0.54,-1.29 0.36,-0.36 0.79,-0.54 1.29,-0.54l3.66 0c0.5,0 0.92,0.18 1.29,0.54 0.36,0.36 0.54,0.79 0.54,1.29zm0 11l0 3.66c0,0.5 -0.18,0.93 -0.54,1.29 -0.36,0.36 -0.79,0.54 -1.29,0.54l-3.66 0c-0.5,0 -0.93,-0.18 -1.29,-0.54 -0.36,-0.36 -0.54,-0.79 -0.54,-1.29l0 -3.66c0,-0.5 0.18,-0.93 0.54,-1.29 0.36,-0.36 0.79,-0.55 1.29,-0.55l3.66 0c0.5,0 0.92,0.18 1.29,0.55 0.36,0.36 0.54,0.79 0.54,1.29zm27.49 -16.49l-21.99 0c-0.5,0 -0.92,-0.18 -1.29,-0.54 -0.36,-0.36 -0.55,-0.79 -0.55,-1.29l0 -14.66c0,-0.5 0.18,-0.92 0.55,-1.29 0.36,-0.36 0.79,-0.54 1.29,-0.54l21.99 0c0.5,0 0.92,0.18 1.29,0.54 0.36,0.36 0.54,0.79 0.54,1.29l0 14.66c0,0.5 -0.18,0.92 -0.54,1.29 -0.36,0.36 -0.79,0.54 -1.29,0.54zm10.99 -11l-3.66 0c-0.5,0 -0.93,-0.18 -1.29,-0.55 -0.36,-0.36 -0.55,-0.79 -0.55,-1.29l0 -3.66c0,-0.5 0.18,-0.92 0.55,-1.29 0.36,-0.36 0.79,-0.54 1.29,-0.54l3.66 0c0.5,0 0.93,0.18 1.29,0.54 0.36,0.36 0.54,0.79 0.54,1.29l0 3.66c0,0.5 -0.18,0.93 -0.54,1.29 -0.36,0.36 -0.79,0.55 -1.29,0.55zm-4.95 10.45c-0.36,-0.36 -0.55,-0.79 -0.55,-1.29l0 -3.66c0,-0.5 0.18,-0.93 0.55,-1.29 0.36,-0.36 0.79,-0.55 1.29,-0.55l3.66 0c0.5,0 0.93,0.18 1.29,0.55 0.36,0.36 0.54,0.79 0.54,1.29l0 3.66c0,0.5 -0.18,0.92 -0.54,1.29 -0.36,0.36 -0.79,0.54 -1.29,0.54l-3.66 0c-0.5,0 -0.93,-0.18 -1.29,-0.54zm-0.55 20.7l0 -3.66c0,-0.5 0.18,-0.93 0.55,-1.29 0.36,-0.36 0.79,-0.55 1.29,-0.55l3.66 0c0.5,0 0.93,0.18 1.29,0.55 0.36,0.36 0.54,0.79 0.54,1.29l0 3.66c0,0.5 -0.18,0.93 -0.54,1.29 -0.36,0.36 -0.79,0.54 -1.29,0.54l-3.66 0c-0.5,0 -0.93,-0.18 -1.29,-0.54 -0.36,-0.36 -0.55,-0.79 -0.55,-1.29z"
              />
            </G>
          </Svg>
          <FlatList
            horizontal
            data={videos}
            renderItem={renderVideos}
            keyExtractor={(item) => item.group_uid}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}

export default SendMaterialMain;
