import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFileHistorian } from '../../redux/actions/historianMaterial';
import { removeFile, removeFiles } from '../../redux/actions/material';
import { closeSendModalDelete } from '../../redux/ducks/application';

const DeleteFileModal = () => {
  const dispatch = useDispatch();

  const modalVisible = useSelector(
    (state) => state.application.sendModalDelete,
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  const { role } = currentUser;

  const { open, item } = modalVisible;

  const handlePressUser = () => {
    if (item.group_uid) {
      dispatch(removeFiles(item));
      closeModal();
    } else {
      dispatch(removeFile(item));
      closeModal();
    }
  };

  const handlePressHistorian = () => {
    dispatch(removeFileHistorian(item));
    closeModal();
  };

  const closeModal = () => {
    dispatch(closeSendModalDelete());
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        closeModal();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>ВЫ УВЕРЕНЫ</Text>
          <View style={styles.btnContainer}>
            <Pressable
              style={styles.button}
              onPress={role === 'user' ? handlePressUser : handlePressHistorian}
            >
              <Text style={styles.textStyle}>Да</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>Нет</Text>
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
    paddingHorizontal: 40,
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
    textTransform: 'uppercase',
    color: '#9e9e9e',
    fontSize: 16,
    fontFamily: 'GothamMedium',
  },
});

export default DeleteFileModal;
