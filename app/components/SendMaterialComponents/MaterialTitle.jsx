import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import { changeTitle } from '../../redux/ducks/files';

const MaterialTitle = () => {
  const dispatch = useDispatch();

  const title = useSelector((state) => state.files.materials.title);

  const handleChangeTitle = (event) => {
    dispatch(changeTitle(event.nativeEvent.text));
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
        Название материала
      </Text>
      <TextInput
        style={sendMaterialStyles.inputTitle}
        type="password"
        name="title"
        value={title}
        placeholder="Введите название"
        onChange={handleChangeTitle}
      />
    </View>
  );
};

export default MaterialTitle;
