import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeText } from '../../redux/ducks/files';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';

const MaterialText = () => {
  const dispatch = useDispatch();

  const text = useSelector((state) => state.files.materials.text);

  const handleChangeText = (event) => {
    dispatch(changeText(event.nativeEvent.text));
  };

  return (
    <View style={sendMaterialStyles.inputTitleContainer}>
      <Text
        style={{
          textAlign: 'left',
          marginBottom: 10,
          fontWeight: '400',
          fontSize: 15,
        }}
      >
        Текст материала
      </Text>
      <TextInput
        multiline
        numberOfLines={7}
        style={sendMaterialStyles.inputText}
        type="password"
        name="title"
        value={text.text}
        placeholder="Введите текст"
        onChange={handleChangeText}
      />
    </View>
  );
};

export default MaterialText;
