import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import PickFileIcon from '../../SvgIcons/ChatIcons/PickFileIcon';
import color from '../../misc/color';
import MessageInput from './MessageInput';
import SendMessageBtn from './SendMessageBtn';
import SendFileBtn from './SendFileBtn';

const MessageSend = ({ contactId }) => {
  const [message, setMessage] = React.useState('');

  return (
    <View style={styles.container}>
      <SendFileBtn />
      <MessageInput message={message} setMessage={setMessage} />
      <SendMessageBtn
        contactId={contactId}
        message={message}
        setMessage={setMessage}
      />
    </View>
  );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: color.MAIN_COLOR,
  },
});

export default MessageSend;
