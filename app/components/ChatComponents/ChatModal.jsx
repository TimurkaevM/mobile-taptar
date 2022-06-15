import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../misc/color';
import { closeChatModal } from '../../redux/ducks/application';
import PickFileBtns from './PickFileBtns';
import RoomFiles from './RoomFiles';

const ChatModal = ({ contactId }) => {
  const dispatch = useDispatch();

  const [pickRoomFiles, setPickRoomFiles] = useState(false);

  const modalVisible = useSelector((state) => state.application.chatModal);

  const closeModal = () => {
    dispatch(closeChatModal());
    setPickRoomFiles(false);
  };

  return (
    <Modal animationType="slide" transparent visible={modalVisible}>
      <View style={styles.modal}>
        {pickRoomFiles ? (
          <RoomFiles
            closeModal={closeModal}
            setPickRoomFiles={setPickRoomFiles}
          />
        ) : (
          <PickFileBtns
            closeModal={closeModal}
            setPickRoomFiles={setPickRoomFiles}
          />
        )}
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
