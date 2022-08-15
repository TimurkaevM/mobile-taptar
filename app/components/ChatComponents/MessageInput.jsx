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

const inputDimensions = {
  cardWidth: 230,
  cardTitleSize: 13,
};

function getInputDimensions() {
  if (width <= 450) return inputDimensions;
  if (width > 450 && width <= 700) {
    inputDimensions.cardWidth = 330;
    inputDimensions.cardTitleSize = 13;
    return inputDimensions;
  }
  if (width > 700) {
    inputDimensions.cardWidth = 500;
    inputDimensions.cardTitleSize = 14;
    return inputDimensions;
  }
}

const styles = StyleSheet.create({
  input: {
    width: getInputDimensions().cardWidth,
    maxHeight: 105,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 5,
    borderRadius: 10,
    backgroundColor: color.APP_BG,
    color: color.MAIN_COLOR,
    fontSize: getInputDimensions().cardTitleSize,
    borderWidth: 0.5,
    lineHeight: 13,
    borderColor: '#878787',
    fontFamily: 'GothamMedium',
  },
});

export default MessageInput;
