import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../misc/color';
import { closeChatModal } from '../../redux/ducks/application';
import ImageAddBtnIcon from '../../SvgIcons/SendMaterialIcons/ImageAddBtnIcon';
import DocumentAddBtnIcon from '../../SvgIcons/SendMaterialIcons/DocumentAddBtnIcon';
import VideoAddBtnIcon from '../../SvgIcons/SendMaterialIcons/VideoAddBtnIcon';
import AudioAddBtnIcon from '../../SvgIcons/SendMaterialIcons/AudioAddBtnIcon';
import { addFile } from '../../redux/ducks/messages';

const ChatModal = ({ contactId }) => {
  const dispatch = useDispatch();

  const modalVisible = useSelector((state) => state.application.chatModal);

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

  const closeModal = () => {
    dispatch(closeChatModal());
  };

  return (
    <>
      <StatusBar hidden />
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modal}>
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
          </View>
        </View>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBg} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: color.APP_BG,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1000,
  },
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
  modalBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: color.MODAL_BG,
  },
});

export default ChatModal;
