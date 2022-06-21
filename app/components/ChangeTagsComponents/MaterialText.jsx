import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeText } from '../../redux/actions/material';
import { changeTextHistorian } from '../../redux/actions/historianMaterial';
import color from '../../misc/color';

const MaterialText = ({ setTextError, textError }) => {
  const dispatch = useDispatch();

  const userText = useSelector((state) => state.sendMaterial.materials.text);
  const historianText = useSelector(
    (state) => state.historianMaterial.materials.text,
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  const { role } = currentUser;

  const changeUserText = (event) => {
    if (textError) {
      setTextError(null);
      dispatch(changeText(event.nativeEvent.text));
    } else {
      dispatch(changeText(event.nativeEvent.text));
    }
  };

  const changeHistorianText = (event) => {
    if (textError) {
      setTextError(null);
      dispatch(changeTextHistorian(event.nativeEvent.text));
    } else {
      dispatch(changeTextHistorian(event.nativeEvent.text));
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
        value={role === 'user' ? userText.text : historianText.text}
        placeholder="Введите комментарий..."
        onChange={role === 'user' ? changeUserText : changeHistorianText}
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
    borderWidth: 0.6,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderColor: color.MAIN_COLOR,
    color: '#000',
    fontSize: 13,
    textAlignVertical: 'top',
  },
});

export default MaterialText;
