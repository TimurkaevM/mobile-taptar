import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeAuthorTag,
  changePlaceTag,
  changeTitleTag,
  changeYearTag,
} from '../../redux/ducks/files';

const InputInfoBox = () => {
  const dispatch = useDispatch();

  const title = useSelector((state) => state.files.title);
  const year = useSelector((state) => state.files.year);
  const location = useSelector((state) => state.files.location);
  const author = useSelector((state) => state.files.author);

  const handleChangeTitle = (event) => {
    dispatch(changeTitleTag(event.nativeEvent.text));
  };

  const handleChangeAuthor = (event) => {
    dispatch(changeAuthorTag(event.nativeEvent.text));
  };

  const handleChangeLocation = (event) => {
    dispatch(changePlaceTag(event.nativeEvent.text));
  };

  const handleChangeYear = (event) => {
    dispatch(changeYearTag(event.nativeEvent.text));
  };

  return (
    <>
      <View style={styles.inputTitleContainer}>
        <Text
          style={{
            textAlign: 'left',
            marginBottom: 10,
            textTransform: 'capitalize',
            fontWeight: '400',
            fontSize: 15,
          }}
        >
          Название
        </Text>
        <TextInput
          style={styles.inputTitle}
          type="password"
          name="titleTag"
          value={title}
          placeholder="Введите название"
          onChange={handleChangeTitle}
        />
      </View>

      <View style={styles.inputTitleContainer}>
        <Text
          style={{
            textAlign: 'left',
            marginBottom: 10,
            textTransform: 'capitalize',
            fontWeight: '400',
            fontSize: 15,
          }}
        >
          Год
        </Text>
        <TextInput
          style={styles.inputTitle}
          type="password"
          name="year"
          value={year}
          placeholder="Введите год"
          onChange={handleChangeYear}
        />
      </View>

      <View style={styles.inputTitleContainer}>
        <Text
          style={{
            textAlign: 'left',
            marginBottom: 10,
            textTransform: 'capitalize',
            fontWeight: '400',
            fontSize: 15,
          }}
        >
          Автор
        </Text>
        <TextInput
          style={styles.inputTitle}
          type="password"
          name="author"
          value={author}
          placeholder="Введите автора"
          onChange={handleChangeAuthor}
        />
      </View>

      <View style={styles.inputTitleContainer}>
        <Text
          style={{
            textAlign: 'left',
            marginBottom: 10,
            textTransform: 'capitalize',
            fontWeight: '400',
            fontSize: 15,
          }}
        >
          Место
        </Text>
        <TextInput
          style={styles.inputTitle}
          type="password"
          name="location"
          value={location}
          placeholder="Введите место"
          onChange={handleChangeLocation}
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

  inputTitle: {
    width: '100%',
    height: 50,
    paddingLeft: 15,
    borderWidth: 0.2,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 13,
  },
});

export default InputInfoBox;
