import { TextInput, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import color from '../../misc/color';

const MessageInput = ({ message, setMessage }) => {
  return (
    <TextInput
      style={styles.input}
      type="message"
      name={message}
      value={message}
      onChangeText={setMessage}
      placeholder="Введите сообщение"
    />
  );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 50,
    paddingLeft: 15,
    borderRadius: 30,
    backgroundColor: color.APP_BG,
    color: color.MAIN_COLOR,
    fontSize: 13,
    borderWidth: 0.5,
    borderColor: '#878787',
    fontFamily: 'GothamMedium',
  },
});

export default MessageInput;
