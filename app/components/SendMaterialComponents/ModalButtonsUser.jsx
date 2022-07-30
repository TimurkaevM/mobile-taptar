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
import { postFailDocument } from '../../redux/ducks/uploadFiles';
import ImageAddBtnIcon from '../../SvgIcons/SendMaterialIcons/ImageAddBtnIcon';
import DocumentAddBtnIcon from '../../SvgIcons/SendMaterialIcons/DocumentAddBtnIcon';
import VideoAddBtnIcon from '../../SvgIcons/SendMaterialIcons/VideoAddBtnIcon';
import AudioAddBtnIcon from '../../SvgIcons/SendMaterialIcons/AudioAddBtnIcon';

const ModalButtonsUser = ({ navigate }) => {
  const dispatch = useDispatch();

  const modalVisible = useSelector(
    (state) => state.application.sendModalButtons,
  );

  const closeModal = () => {
    dispatch(closeSendModalButtons());
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/*',
      copyToCacheDirectory: true,
    }).then((response) => {
      if (response.type == 'success') {
        let { name, size, uri } = response;

        if (Platform.OS === 'android' && uri[0] === '/') {
          uri = `file://${uri}`;
          uri = uri.replace(/%/g, '%25');
        }

        let nameParts = name.split('.');
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: 'application/' + fileType,
        };
        navigate('ModalAddFile');
        dispatch(postFailDocument(fileToUpload, 'document'));
        closeModal();
      }
    });
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
                  max: 5,
                  currentRoom: 'materialUser',
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
              onPress={pickDocument}
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
                  max: 5,
                  currentRoom: 'materialUser',
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
              onPress={() => {
                navigate('AudioListScreen');
                closeModal();
              }}
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

export default ModalButtonsUser;
