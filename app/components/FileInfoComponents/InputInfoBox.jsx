import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const InputInfoBox = () => {
  const file = useSelector((state) => state.showFileCabinet.file);

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
          value={file.title}
          placeholder="Введите название"
        />
      </View>

      {file.year && (
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
            value={file.year}
            placeholder="Введите год"
          />
        </View>
      )}

      {file.author && (
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
            value={file.author}
            placeholder="Введите автора"
          />
        </View>
      )}

      {file.location && (
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
            value={file.location}
            placeholder="Введите место"
          />
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
