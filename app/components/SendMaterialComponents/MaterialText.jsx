import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import {
  changeText,
  clearTextForm,
  deleteDraftText,
} from '../../redux/actions/material';

const MaterialText = ({ navigate }) => {
  const dispatch = useDispatch();

  const text = useSelector((state) => state.sendMaterial.materials.text);

  const handleChangeText = (event) => {
    if (
      event.nativeEvent.text === '' &&
      text.text !== undefined &&
      text.id !== undefined
    ) {
      dispatch(deleteDraftText(text.id));
    }
    dispatch(changeText(event.nativeEvent.text));
  };

  const handleClickClearText = () => {
    if (text.id !== undefined) return dispatch(deleteDraftText(text.id));

    return dispatch(clearTextForm());
  };

  const onPressNavigate = () => {
    if (text.id) {
      navigate('ChangeTagsScreen', { item: text });
    } else {
      navigate('ModalAddFile', { type: 'text' });
    }
  };

  return (
    <View style={sendMaterialStyles.inputTitleContainer}>
      <View style={sendMaterialStyles.textTitleContainer}>
        <Text
          style={{
            marginBottom: 10,
            fontWeight: '600',
            fontSize: 17,
          }}
        >
          Добавить текст
        </Text>
        <TouchableOpacity onPress={handleClickClearText}>
          <Text
            style={{
              marginBottom: 10,
              fontWeight: '400',
              fontSize: 15,
              color: '#bed1e6',
            }}
          >
            удалить текст
          </Text>
        </TouchableOpacity>
      </View>
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
      {text.text ? (
        <TouchableOpacity
          onPress={onPressNavigate}
          style={{
            width: 200,
            paddingTop: 40,
            paddingBottom: 6,
            backgroundColor: text.title ? '#4caf50' : '#f00',
            borderRadius: 15,
            position: 'absolute',
            zIndex: -1,
            bottom: 25,
            right: 20,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 10,
              fontWeight: '400',
              fontSize: 12,
              color: '#fff',
            }}
          >
            {text.title ? 'Изменить принадлежности' : 'Добавить принадлежности'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default MaterialText;
