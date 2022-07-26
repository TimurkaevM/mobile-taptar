import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import color from '../../misc/color';

const InputInfoBox = ({
  setNameError,
  setAuthorError,
  setYearError,
  nameError,
  authorError,
  yearError,
  title,
  year,
  location,
  author,
  setTitle,
  setAuthor,
  setYear,
  setLocation,
}) => {
  const handleChangeTitle = (event) => {
    if (nameError) {
      setNameError(null);
    }
    return;
  };

  const handleChangeAuthor = (event) => {
    if (authorError) {
      setAuthorError(null);
    }
    return;
  };

  const handleChangeLocation = (event) => {
    return;
  };

  const handleChangeYear = (event) => {
    if (yearError) {
      setYearError(null);
    }
    return;
  };

  return (
    <>
      <View style={styles.inputTitleContainer}>
        <Text style={styles.title}>Название</Text>
        <TextInput
          style={styles.inputTitle}
          type="password"
          name="titleTag"
          value={title}
          placeholder="Введите название"
          onChange={handleChangeTitle}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.inputTitleContainer}>
        <Text style={styles.title}>Год</Text>
        <TextInput
          style={styles.inputTitle}
          type="password"
          name="year"
          value={year}
          placeholder="Введите год"
          onChange={handleChangeYear}
          onChangeText={setYear}
        />
      </View>

      <View style={styles.inputTitleContainer}>
        <Text style={styles.title}>Автор</Text>
        <TextInput
          style={styles.inputTitle}
          type="password"
          name="author"
          value={author}
          placeholder="Введите автора"
          onChange={handleChangeAuthor}
          onChangeText={setAuthor}
        />
      </View>

      <View style={styles.inputTitleContainer}>
        <Text style={styles.title}>Место</Text>
        <TextInput
          style={styles.inputTitle}
          name="location"
          value={location}
          placeholder="Введите место"
          onChange={handleChangeLocation}
          onChangeText={setLocation}
        />
      </View>
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
    fontSize: 15,
    fontFamily: 'GothamMedium',
  },

  inputTitle: {
    width: '100%',
    height: 50,
    paddingLeft: 15,
    borderWidth: 0.6,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderColor: color.MAIN_COLOR,
    color: '#000',
    fontSize: 13,
    fontFamily: 'GothamMedium',
  },
});

export default InputInfoBox;
