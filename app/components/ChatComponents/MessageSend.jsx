import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
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
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingBottom: 30,
    paddingTop: 10,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    borderTopWidth: 0.6,
    borderTopColor: '#878787',
  },
});

export default MessageSend;
