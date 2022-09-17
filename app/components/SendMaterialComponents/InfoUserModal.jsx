import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postMaterial } from '../../redux/actions/material';
import { closeInfoUserModal } from '../../redux/ducks/application';

const InfoUserModal = () => {
  const dispatch = useDispatch();

  const userMaterial = useSelector((state) => state.sendMaterial.materials);
  const modalVisible = useSelector((state) => state.application.infoUserModal);

  const photo =
    userMaterial.photo.one.length || userMaterial.photo.group.length
      ? userMaterial.photo
      : [];
  const document =
    userMaterial.document.one.length || userMaterial.document.group.length
      ? userMaterial.document
      : [];
  const video =
    userMaterial.video.one.length || userMaterial.video.group.length
      ? userMaterial.video
      : [];
  const audio =
    userMaterial.audio.one.length || userMaterial.audio.group.length
      ? userMaterial.audio
      : [];

  const handlePressUser = () => {
    dispatch(
      postMaterial(
        userMaterial.title,
        userMaterial.text,
        photo,
        document,
        video,
        audio,
      ),
    );
    closeModal();
  };

  const closeModal = () => {
    dispatch(closeInfoUserModal());
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        closeModal();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Если ваш материал будет принят, он будет показываться на сайте
            другим пользователям.Вы не сможете его удалить.
          </Text>
          <View style={styles.btnContainer}>
            <Pressable style={styles.button} onPress={handlePressUser}>
              <Text style={styles.textStyle}>Отправить</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>Отклонить</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffcc',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#9e9e9e',
  },
  btnContainer: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    backgroundColor: '#1178cb',
  },
  buttonClose: {
    marginLeft: 13,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'GothamMedium',
  },
  modalText: {
    marginBottom: 30,
    textAlign: 'center',
    color: '#9e9e9e',
    lineHeight: 20,
    fontSize: 16,
    fontFamily: 'GothamMedium',
  },
});

export default InfoUserModal;
