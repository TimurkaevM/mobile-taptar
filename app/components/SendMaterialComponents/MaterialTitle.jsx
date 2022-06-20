import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import { changeTitle, setSendError } from '../../redux/actions/material';
import {
  setHistorianSendError,
  historianMaterialTitle,
} from '../../redux/actions/historianMaterial';

const MaterialTitle = () => {
  const dispatch = useDispatch();

  const userTitle = useSelector((state) => state.sendMaterial.materials.title);
  const historianTitle = useSelector(
    (state) => state.historianMaterial.materials.title,
  );
  const sendUserError = useSelector((state) => state.sendMaterial.sendError);
  const sendHistorianError = useSelector(
    (state) => state.historianMaterial.sendError,
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  const { role } = currentUser;

  const changeUserTitle = (event) => {
    if (sendUserError) {
      dispatch(setSendError());
    }
    dispatch(changeTitle(event.nativeEvent.text));
  };

  const changeHistorianTitle = (event) => {
    if (sendHistorianError) {
      dispatch(setHistorianSendError());
    }
    dispatch(historianMaterialTitle(event.nativeEvent.text));
  };

  return (
    <View style={sendMaterialStyles.inputTitleContainer}>
      <Text
        style={{
          textAlign: 'left',
          marginBottom: 10,
          fontWeight: '600',
          fontSize: 17,
        }}
      >
        Название материала
      </Text>
      <TextInput
        style={sendMaterialStyles.inputTitle}
        type="password"
        name="title"
        value={role === 'user' ? userTitle : historianTitle}
        placeholder="Введите название"
        onChange={role === 'user' ? changeUserTitle : changeHistorianTitle}
      />
    </View>
  );
};

export default MaterialTitle;
