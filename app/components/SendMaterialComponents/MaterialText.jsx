import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import {
  changeText,
  clearTextForm,
  deleteDraftText,
} from '../../redux/actions/material';
import {
  changeTextHistorian,
  clearHistorianTextForm,
  deleteHistorianDraftText,
} from '../../redux/actions/historianMaterial';

const MaterialText = ({ navigate }) => {
  const dispatch = useDispatch();

  const userText = useSelector((state) => state.sendMaterial.materials.text);
  const historianText = useSelector(
    (state) => state.historianMaterial.materials.text,
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  const { role } = currentUser;

  const changeUserText = (event) => {
    if (
      event.nativeEvent.text === '' &&
      userText.text !== undefined &&
      userText.id !== undefined
    ) {
      dispatch(deleteDraftText(userText.id));
    }
    dispatch(changeText(event.nativeEvent.text));
  };

  const changeHistorianText = (event) => {
    if (
      event.nativeEvent.text === '' &&
      historianText.text !== undefined &&
      historianText.id !== undefined
    ) {
      dispatch(deleteHistorianDraftText(historianText.id));
    }
    dispatch(changeTextHistorian(event.nativeEvent.text));
  };

  const clearUserText = () => {
    if (userText.id !== undefined)
      return dispatch(deleteDraftText(userText.id));

    return dispatch(clearTextForm());
  };

  const clearHistorianText = () => {
    if (historianText.id !== undefined)
      return dispatch(deleteHistorianDraftText(historianText.id));

    return dispatch(clearHistorianTextForm());
  };

  const onPressNavigate = () => {
    if (userText.id) {
      navigate('ChangeTagsScreen', { item: userText });
    } else if (historianText.id) {
      navigate('ChangeTagsScreen', { item: historianText });
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
            fontFamily: 'GothamMedium',
          }}
        >
          Добавить текст
        </Text>
        <TouchableOpacity
          onPress={role === 'user' ? clearUserText : clearHistorianText}
        >
          <Text
            style={{
              marginBottom: 10,
              fontWeight: '500',
              fontSize: 15,
              color: '#bed1e6',
              fontFamily: 'GothamLight',
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
        value={role === 'user' ? userText.text : historianText.text}
        placeholder="Введите текст"
        onChange={role === 'user' ? changeUserText : changeHistorianText}
      />
      {userText.text || historianText.text ? (
        <TouchableOpacity
          onPress={onPressNavigate}
          style={{
            width: 200,
            paddingTop: 40,
            paddingBottom: 6,
            backgroundColor:
              userText.title || historianText.title ? '#4caf50' : '#f00',
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
              fontFamily: 'GothamMedium',
            }}
          >
            {userText.title || historianText.title
              ? 'Изменить принадлежности'
              : 'Добавить принадлежности'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default MaterialText;
