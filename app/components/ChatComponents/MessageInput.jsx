import { TextInput, StyleSheet, Dimensions, Platform } from 'react-native';
import React from 'react';
import color from '../../misc/color';

const MessageInput = ({ message, setMessage }) => {
  return (
    <TextInput
      multiline
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
    width: 230,
    maxHeight: 105,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 5,
    borderRadius: 10,
    backgroundColor: color.APP_BG,
    color: color.MAIN_COLOR,
    fontSize: 13,
    borderWidth: 0.5,
    lineHeight: 13,
    borderColor: '#878787',
    fontFamily: 'GothamMedium',
  },
});

export default MessageInput;
