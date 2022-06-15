import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeText } from '../../redux/ducks/historianSend';

const MaterialText = ({ setTextError, textError }) => {
  const dispatch = useDispatch();

  const text = useSelector((state) => state.sendMaterial.materials.text);

  const handleChangeText = (event) => {
    if (textError) {
      setTextError(null);
      dispatch(changeText(event.nativeEvent.text));
    } else {
      dispatch(changeText(event.nativeEvent.text));
    }
  };

  return (
    <View style={styles.inputTitleContainer}>
      <Text
        style={{
          textAlign: 'left',
          marginBottom: 10,
          textTransform: 'capitalize',
          fontWeight: '400',
          fontSize: 15,
        }}
      >
        Изменить текст
      </Text>
      <TextInput
        multiline
        numberOfLines={7}
        style={styles.inputComment}
        type="password"
        name="comment"
        value={text.text}
        placeholder="Введите комментарий..."
        onChange={handleChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitleContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  inputComment: {
    width: '100%',
    height: 200,
    padding: 20,
    borderWidth: 0.1,
    borderRadius: 2,
    marginBottom: 20,
    backgroundColor: '#fafafa',
    color: '#000',
    fontSize: 13,
    textAlignVertical: 'top',
  },
});

export default MaterialText;
