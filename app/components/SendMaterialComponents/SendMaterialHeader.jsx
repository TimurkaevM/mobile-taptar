import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import color from '../../misc/color';
import { useDispatch, useSelector } from 'react-redux';
import { postMaterial } from '../../redux/actions/material';
import { postHistorianMaterial } from '../../redux/actions/historianMaterial';

const SendMaterialHeader = () => {
  const dispatch = useDispatch();

  const userMaterial = useSelector((state) => state.sendMaterial.materials);
  const sendUserError = useSelector((state) => state.sendMaterial.sendError);
  const historianMaterial = useSelector(
    (state) => state.historianMaterial.materials,
  );
  const sendHistorianError = useSelector(
    (state) => state.historianMaterial.sendError,
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  const { role } = currentUser;

  const photo =
    userMaterial.photo.one.length || userMaterial.photo.group.length
      ? userMaterial.photo
      : [];
  const document =
    userMaterial.document.one.length || userMaterial.document.group.length
      ? userMaterial.document
      : [];
  const video =
    userMaterial.video.one.length || userMaterial.video.group.length
      ? userMaterial.video
      : [];
  const audio =
    userMaterial.audio.one.length || userMaterial.audio.group.length
      ? userMaterial.audio
      : [];

  const onPressUser = () => {
    dispatch(
      postMaterial(
        userMaterial.title,
        userMaterial.text,
        photo,
        document,
        video,
        audio,
      ),
    );
  };

  const onPressHistorian = () => {
    dispatch(
      postHistorianMaterial(
        historianMaterial.bookmark,
        historianMaterial.is_material,
        historianMaterial.title,
        historianMaterial.text,
        historianMaterial.photo,
        historianMaterial.document,
        historianMaterial.audio,
        historianMaterial.video,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ color: '#4686cc', fontSize: 12.5 }}>
          ФОРМА ОТПРАВКИ ИНФОРМАЦИИ
        </Text>
        <TouchableOpacity
          onPress={role === 'user' ? onPressUser : onPressHistorian}
          style={styles.btn}
        >
          <Text style={styles.btnText}>отправить</Text>
        </TouchableOpacity>
      </View>
      {sendUserError ? (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
          Не удалось отправить материал, пожалуйста убедитесь в целостности
          данных
        </Text>
      ) : null}
      {sendHistorianError ? (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
          Не удалось отправить материал, пожалуйста убедитесь в целостности
          данных
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: color.MAIN_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnText: {
    color: color.APP_BG,
  },
});

export default SendMaterialHeader;
