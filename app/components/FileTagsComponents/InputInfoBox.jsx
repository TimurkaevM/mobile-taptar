import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const InputInfoBox = ({ title, year, location, author }) => {
  return (
    <>
      <View style={styles.inputTitleContainer}>
        <Text style={styles.title}>Название:</Text>
        <Text style={styles.text}>{title}</Text>
      </View>

      {year && (
        <View style={styles.inputTitleContainer}>
          <Text style={styles.title}>Год:</Text>
          <Text style={styles.text}>{year}</Text>
        </View>
      )}

      {author && (
        <View style={styles.inputTitleContainer}>
          <Text style={styles.title}>Автор:</Text>
          <Text style={styles.text}>{author}</Text>
        </View>
      )}

      {location && (
        <View style={styles.inputTitleContainer}>
          <Text style={styles.title}>Место:</Text>
          <Text style={styles.text}>{location}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputTitleContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  title: {
    textAlign: 'left',
    marginBottom: 10,
    textTransform: 'capitalize',
    fontWeight: '400',
    fontSize: 17,
    fontFamily: 'GothamMedium',
  },
  text: {
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
    fontFamily: 'GothamLight',
  },
});

export default InputInfoBox;
