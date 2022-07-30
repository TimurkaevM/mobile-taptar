import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../misc/color';
import { closeSendModalButtons } from '../../redux/ducks/application';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import * as DocumentPicker from 'expo-document-picker';
import ImageAddBtnIcon from '../../SvgIcons/SendMaterialIcons/ImageAddBtnIcon';
import DocumentAddBtnIcon from '../../SvgIcons/SendMaterialIcons/DocumentAddBtnIcon';
import VideoAddBtnIcon from '../../SvgIcons/SendMaterialIcons/VideoAddBtnIcon';
import AudioAddBtnIcon from '../../SvgIcons/SendMaterialIcons/AudioAddBtnIcon';
import { postFileHistorian } from '../../redux/ducks/uploadFiles';

const ModalButtonsHistorian = ({ navigate }) => {
  const dispatch = useDispatch();

  const modalVisible = useSelector(
    (state) => state.application.sendModalButtons,
  );

  const closeModal = () => {
    dispatch(closeSendModalButtons());
  };

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
      navigate('ModalAddFile');
      dispatch(postFileHistorian(fileToUpload, mediaType));
      closeModal();
    }
  };

  return (
    <Modal animationType="slide" transparent visible={modalVisible}>
      <View style={styles.modal}>
        <View
          style={{
            flexDirection: 'column',
            width: 220,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={sendMaterialStyles.btnAddMedia}
              title="Pick an image from camera roll"
              onPress={() => {
                navigate('ImageBrowserScreen', {
                  media: 'photo',
                  min: 1,
                  max: 1,
                  currentRoom: 'materialHistorian',
                });
                closeModal();
              }}
            >
              <View style={sendMaterialStyles.btnAddIcon}>
                <ImageAddBtnIcon />
              </View>
              <Text style={sendMaterialStyles.btnAddText}>Фото</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={sendMaterialStyles.btnAddMedia}
              title="Pick an image from camera roll"
              onPress={() => pickFile('document', 'application')}
            >
              <View style={sendMaterialStyles.btnAddIcon}>
                <DocumentAddBtnIcon />
              </View>
              <Text style={sendMaterialStyles.btnAddText}>Документ</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={sendMaterialStyles.btnAddMedia}
              title="Pick an image from camera roll"
              onPress={() => {
                navigate('VideoBrowserScreen', {
                  media: 'video',
                  min: 1,
                  max: 1,
                  currentRoom: 'materialHistorian',
                });
                closeModal();
              }}
            >
              <View style={sendMaterialStyles.btnAddIcon}>
                <VideoAddBtnIcon />
              </View>
              <Text style={sendMaterialStyles.btnAddText}>Видео</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={sendMaterialStyles.btnAddMedia}
              title="Pick an image from camera roll"
              onPress={() => pickFile('audio', 'audio')}
            >
              <View style={sendMaterialStyles.btnAddIcon}>
                <AudioAddBtnIcon />
              </View>
              <Text style={sendMaterialStyles.btnAddText}>Аудио</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalBg} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: color.APP_BG,
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 50,
    zIndex: 1000,
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

export default ModalButtonsHistorian;
