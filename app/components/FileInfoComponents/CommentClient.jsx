import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const CommentClient = () => {
  const file = useSelector((state) => state.showFileCabinet.file);

  return (
    <View style={styles.inputTitleContainer}>
      <Text
        style={{
          textAlign: 'left',
          marginBottom: 10,
          textTransform: 'capitalize',
          fontWeight: '400',
          fontSize: 15,
          fontFamily: 'GothamMedium',
        }}
      >
        Комментарий
      </Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={styles.inputComment}
        type="password"
        name="comment"
        value={file.comment}
        placeholder="Введите комментарий..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitleContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  inputComment: {
    width: '100%',
    height: 100,
    padding: 20,
    borderWidth: 0.1,
    borderRadius: 2,
    marginBottom: 20,
    backgroundColor: '#fafafa',
    color: '#000',
    fontSize: 13,
    textAlignVertical: 'top',
    fontFamily: 'GothamMedium',
  },
});

export default CommentClient;
