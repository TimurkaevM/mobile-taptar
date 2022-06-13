import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import SendBtnIcon from '../../SvgIcons/ChatIcons/SendBtnIcon';
import { useSelector, useDispatch } from 'react-redux';
import { addingMassage } from '../../redux/ducks/messages';

const SendMessageBtn = ({ message, setMessage, contactId }) => {
  const dispatch = useDispatch();

  const myId = useSelector((state) => state.user.currentUser.id);

  const loadingAddMessage = useSelector(
    (state) => state.messages.loadingMessage,
  );

  const handleAddingMassage = () => {
    if (loadingAddMessage) {
      return;
    }
    if (message === '') {
      return;
    }
    dispatch(addingMassage(myId, contactId, 'text', message));
    setMessage('');
  };

  return (
    <TouchableOpacity onPress={handleAddingMassage} style={styles.btn}>
      <SendBtnIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#878787',
    borderRadius: 50,
  },
});

export default SendMessageBtn;
