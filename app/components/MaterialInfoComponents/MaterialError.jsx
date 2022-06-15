import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setDraftError } from '../../redux/actions/material';

export default function MaterialError() {
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(setDraftError());
  };

  return (
    <View style={styles.errorContainer}>
      <Text
        style={{
          color: 'red',
          textAlign: 'center',
          marginTop: 10,
          paddingHorizontal: 10,
        }}
      >
        Не удалось получить материал...
      </Text>
      <TouchableOpacity
        title="resume error"
        style={styles.errorResume}
        onPress={handlePress}
      >
        <Text style={styles.errorResumeText}>Повторить загрузку</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorResume: {
    marginTop: 30,
    backgroundColor: '#4686cc',
    padding: 20,
    borderRadius: 10,
  },
  errorResumeText: {
    color: '#fff',
  },
});
