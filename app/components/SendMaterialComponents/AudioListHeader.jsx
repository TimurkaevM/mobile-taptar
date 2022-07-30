import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import color from '../../misc/color';
import { postFilesGroup, postMediaFile } from '../../redux/ducks/uploadFiles';
import { useDispatch, useSelector } from 'react-redux';

const AudioListHeader = ({ selectedAudio, goBack, navigate }) => {
  const selectedAudioLength = selectedAudio.length;

  const dispatch = useDispatch();

  const causes = useSelector((state) => state.tags.causes);
  const causId = causes.map((caus) => caus.id);

  const onSuccess = () => {
    if (selectedAudioLength === 0) return;
    navigate('ModalAddFile');
    if (selectedAudioLength > 1)
      return dispatch(postFilesGroup(selectedAudio, 'audio', causId));
    return dispatch(postMediaFile(selectedAudio, 'audio'));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.btn}>
        <Text style={styles.btnText}>назад</Text>
      </TouchableOpacity>
      <Text>{selectedAudioLength} выбрано</Text>
      <TouchableOpacity onPress={onSuccess} style={styles.btn}>
        <Text style={styles.btnText}>отправить</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  btn: {
    backgroundColor: color.MAIN_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnText: {
    color: color.APP_BG,
    fontFamily: 'GothamMedium',
  },
});

export default AudioListHeader;
