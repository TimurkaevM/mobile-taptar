import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addingMassage } from '../../redux/ducks/messages';
import { openChatModal } from '../../redux/ducks/application';
import PickFileIcon from '../../SvgIcons/ChatIcons/PickFileIcon';

const SendFileBtn = ({ message, setMessage, contactId }) => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(openChatModal());
  };

  return (
    <TouchableOpacity onPress={openModal} style={styles.btn}>
      <PickFileIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {},
});

export default SendFileBtn;
