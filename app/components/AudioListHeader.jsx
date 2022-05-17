import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import color from '../misc/color';

const AudioListHeader = ({ selectedAudio, goBack }) => {
  const selectedAudioLength = selectedAudio.length;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.btn}>
        <Text style={styles.btnText}>назад</Text>
      </TouchableOpacity>
      <Text>{selectedAudioLength} выбрано</Text>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>отправить</Text>
      </TouchableOpacity>
    </View>
  )
}

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
  },
});

export default AudioListHeader;