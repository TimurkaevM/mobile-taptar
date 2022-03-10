import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { changeText, changeTitle } from '../../redux/ducks/files';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import AddFileButton from './AddFileButton';
import ModalAddFile from './ModalAddFile';
import { Video } from 'expo-av';

function SendMaterial() {
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
    <SafeAreaView style={{ justifyContent: 'flex-start' }}>
      <ScrollView>
        {/* <View style={{ marginBottom: 40, marginTop: 10, alignItems: "center",  textTransform: "uppercase" }}>
          <Text style={{ textTransform: "uppercase", fontWeight: "700" }}>Форма отправки материала</Text>
        </View> */}

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

        <AddFileButton openModalAddFile={openModalAddFile} />
        {files.length === 0 ? null : (
          <ModalAddFile
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}

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
              keyExtractor={item => item.id}
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
              keyExtractor={item => item.id}
            />
          </View>
        ) : null}

      </ScrollView>
    </SafeAreaView>
  );
}

export default SendMaterial;
