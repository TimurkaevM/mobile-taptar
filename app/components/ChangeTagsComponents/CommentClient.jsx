import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';


const CommentClient = ({ setCommentError, commentError, comment, setComment }) => {
  const handleChangeComment = (event) => {
    if (commentError) {
      setCommentError(null);
    } 
    return;
  };

  return (
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
        Комментарий
      </Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={styles.inputComment}
        type="password"
        name="comment"
        value={comment}
        placeholder="Введите комментарий..."
        onChange={handleChangeComment}
        onChangeText={setComment}
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
  },
});

export default CommentClient;
