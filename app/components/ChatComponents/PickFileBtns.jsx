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

const PickFileBtns = ({ closeModal, setPickRoomFiles, navigate }) => {
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

  const pickImage = () => {
    closeModal();
    navigate('ImageBrowserScreen', {
      media: 'photo',
      min: 1,
      max: 1,
      currentRoom: 'chat',
      contactId,
    });
  };
  const pickVideo = () => {
    closeModal();
    navigate('VideoBrowserScreen', {
      media: 'video',
      min: 1,
      max: 1,
      currentRoom: 'chat',
      contactId,
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 30,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity
        style={styles.btnAddMedia}
        title="Pick an image from camera roll"
        onPress={pickImage}
      >
        <View style={styles.btnAddIcon}>
          <ImageAddBtnIcon />
        </View>
        <Text style={styles.btnAddText}>Фото</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnAddMedia}
        title="Pick an image from camera roll"
        onPress={() => pickFile('document', 'application')}
      >
        <View style={styles.btnAddIcon}>
          <DocumentAddBtnIcon />
        </View>
        <Text style={styles.btnAddText}>Документ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnAddMedia}
        title="Pick an image from camera roll"
        onPress={pickVideo}
      >
        <View style={styles.btnAddIcon}>
          <VideoAddBtnIcon />
        </View>
        <Text style={styles.btnAddText}>Видео</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnAddMedia}
        title="Pick an image from camera roll"
        onPress={() => pickFile('audio', 'audio')}
      >
        <View style={styles.btnAddIcon}>
          <AudioAddBtnIcon />
        </View>
        <Text style={styles.btnAddText}>Аудио</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnAddMedia}
        title="Pick an image from camera roll"
        onPress={() => setPickRoomFiles(true)}
      >
        <View style={styles.btnAddIcon}>
          <AddFileRoomIcon />
        </View>
        <Text style={styles.btnAddText}>Файлы из материала</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnAddMedia: {
    paddingVertical: 10,
    // width: 91,
    marginHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnAddIcon: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#4686cc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnAddText: {
    fontSize: 15,
    color: '#4686cc',
    fontFamily: 'GothamLight',
    marginTop: 10,
  },
});

export default PickFileBtns;
