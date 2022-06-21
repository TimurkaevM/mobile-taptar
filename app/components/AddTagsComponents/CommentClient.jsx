import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCommentTag } from '../../redux/ducks/userTags';
import color from '../../misc/color';

const CommentClient = ({ setCommentError, commentError }) => {
  const dispatch = useDispatch();

  const comment = useSelector((state) => state.userTags.comment);

  const handleChangeComment = (event) => {
    if (commentError) {
      setCommentError(null);
      dispatch(changeCommentTag(event.nativeEvent.text));
    } else {
      dispatch(changeCommentTag(event.nativeEvent.text));
    }
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
    borderWidth: 0.6,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderColor: color.MAIN_COLOR,
    color: '#000',
    fontSize: 13,
    textAlignVertical: 'top',
  },
});

export default CommentClient;
