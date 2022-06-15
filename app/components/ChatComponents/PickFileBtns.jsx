import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import ImageAddBtnIcon from '../../SvgIcons/SendMaterialIcons/ImageAddBtnIcon';
import DocumentAddBtnIcon from '../../SvgIcons/SendMaterialIcons/DocumentAddBtnIcon';
import VideoAddBtnIcon from '../../SvgIcons/SendMaterialIcons/VideoAddBtnIcon';
import AudioAddBtnIcon from '../../SvgIcons/SendMaterialIcons/AudioAddBtnIcon';
import { addFile } from '../../redux/ducks/messages';
import AddFileRoomIcon from '../../SvgIcons/ChatIcons/AddFileRoomIcon';
import { useDispatch, useSelector } from 'react-redux';

const PickFileBtns = ({ closeModal, setPickRoomFiles }) => {
  const contactId = useSelector((state) => state.messages.room?.id);

  const dispatch = useDispatch();

  const pickFile = async (mediaType, sendType) => {
    let result = await DocumentPicker.getDocumentAsync({
      type: `${sendType}/*`,
      copyToCacheDirectory: true,
    });

    if (result.type === 'success') {
      let { name, size, uri, mimeType } = result;

      if (Platform.OS === 'android' && uri[0] === '/') {
        uri = `file://${uri}`;
        uri = uri.replace(/%/g, '%25');
      }

      const fileToUpload = {
        name: name,
        size: size,
        uri: uri,
        type: mimeType,
      };
      closeModal();
      dispatch(addFile(fileToUpload, mediaType, contactId));
    }
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        paddingVertical: 30,
      }}
    >
      <TouchableOpacity
        style={styles.btnAddMedia}
        title="Pick an image from camera roll"
        onPress={() => pickFile('photo', 'image')}
      >
        <ImageAddBtnIcon />
        <Text
          style={{
            marginLeft: 15,
            fontSize: 12,
            textTransform: 'capitalize',
            color: '#fff',
          }}
        >
          Фото
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnAddMedia}
        title="Pick an image from camera roll"
        onPress={() => pickFile('document', 'application')}
      >
        <DocumentAddBtnIcon />
        <Text
          style={{
            marginLeft: 15,
            fontSize: 12,
            textTransform: 'capitalize',
            color: '#fff',
          }}
        >
          Документ
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnAddMedia}
        title="Pick an image from camera roll"
        onPress={() => pickFile('video', 'video')}
      >
        <VideoAddBtnIcon />
        <Text
          style={{
            marginLeft: 15,
            fontSize: 12,
            textTransform: 'capitalize',
            color: '#fff',
          }}
        >
          Видео
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnAddMedia}
        title="Pick an image from camera roll"
        onPress={() => pickFile('audio', 'audio')}
      >
        <AudioAddBtnIcon />
        <Text
          style={{
            marginLeft: 15,
            fontSize: 12,
            textTransform: 'capitalize',
            color: '#fff',
          }}
        >
          Аудио
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnAddMedia}
        title="Pick an image from camera roll"
        onPress={() => setPickRoomFiles(true)}
      >
        <AddFileRoomIcon />
        <Text
          style={{
            marginLeft: 15,
            fontSize: 12,
            textTransform: 'capitalize',
            color: '#fff',
          }}
        >
          файл из материала
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnAddMedia: {
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 18,
    flexDirection: 'row',
    backgroundColor: '#4686cc',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
});

export default PickFileBtns;
