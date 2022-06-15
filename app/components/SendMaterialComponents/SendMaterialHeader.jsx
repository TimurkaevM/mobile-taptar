import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import color from '../../misc/color';
import { useDispatch, useSelector } from 'react-redux';
import { postMaterial } from '../../redux/actions/material';

const SendMaterialHeader = () => {
  const dispatch = useDispatch();

  const materials = useSelector((state) => state.sendMaterial.materials);
  const sendError = useSelector((state) => state.sendMaterial.sendError);

  const photo =
    materials.photo.one.length || materials.photo.group.length
      ? materials.photo
      : [];
  const document =
    materials.document.one.length || materials.document.group.length
      ? materials.document
      : [];
  const video =
    materials.video.one.length || materials.video.group.length
      ? materials.video
      : [];
  const audio =
    materials.audio.one.length || materials.audio.group.length
      ? materials.audio
      : [];

  const handlePostMaterial = () => {
    dispatch(
      postMaterial(
        materials.title,
        materials.text,
        photo,
        document,
        video,
        audio,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ color: '#4686cc', fontSize: 12.5 }}>
          ФОРМА ОТПРАВКИ ИНФОРМАЦИИ
        </Text>
        <TouchableOpacity onPress={handlePostMaterial} style={styles.btn}>
          <Text style={styles.btnText}>отправить</Text>
        </TouchableOpacity>
      </View>
      {sendError ? (
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
