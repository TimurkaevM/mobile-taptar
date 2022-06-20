import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import color from '../../misc/color';
import { useDispatch, useSelector } from 'react-redux';
import { cleanStateTags } from '../../redux/ducks/userTags';
import {
  changeGroupFiles,
  changeOneFile,
  changeTextFile,
} from '../../redux/actions/material';
import {
  changeHistorianFile,
  setTextHistorian,
} from '../../redux/actions/historianMaterial';

const AddTagsHeader = ({
  navigate,
  nameError,
  textError,
  yearError,
  authorError,
  commentError,
  setAuthorError,
  setCommentError,
  setNameError,
  setTextError,
  setYearError,
  title,
  year,
  location,
  author,
  comment,
  albums,
  bookmark,
  effects,
  credibilityClient,
  setCredibilityError,
  credibilityError,
  centuryClient,
  informationClient,
  item,
}) => {
  const dispatch = useDispatch();

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();

  const userText = useSelector((state) => state.sendMaterial.materials.text);
  const historianText = useSelector(
    (state) => state.historianMaterial.materials.text,
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  const { role } = currentUser;

  const onSuccessUser = () => {
    if (!userText.text && item.type === 'text') {
      return setTextError('Текст не может быть пустым');
    }
    if (!title) {
      return setNameError('Название не может быть пустым');
    }
    if (title.length < 4) {
      return setNameError('В название не может быть меньше 4 символов');
    }
    if (year.length !== 0 && /\D/.test(year)) {
      return setYearError('Год только числа');
    }
    if (year.length !== 0 && +year > currentYear) {
      return setYearError('Год не может быть больше текущего');
    }
    if (author.length !== 0 && author.length < 4) {
      return setAuthorError('Автор не может быть меньше 4 символов');
    }
    if (comment.length !== 0 && comment.length > 200) {
      return setCommentError('В комментарии не может быть больше 200 символов');
    }
    if (author.length !== 0 && /\d/.test(author)) {
      return setAuthorError('В авторе не может быть чисел');
    }
    if (item.type === 'text') {
      navigate('SendMaterialScreen');
      dispatch(cleanStateTags());
      dispatch(
        changeTextFile(
          userText,
          title,
          year,
          author,
          location,
          comment,
          centuryClient,
          informationClient,
        ),
      );
      return;
    }
    if (!item.group_uid) {
      navigate('SendMaterialScreen');
      dispatch(cleanStateTags());
      dispatch(
        changeOneFile(
          item.id,
          item.type,
          title,
          year,
          author,
          location,
          comment,
          centuryClient,
          informationClient,
        ),
      );
      return;
    }
    navigate('SendMaterialScreen');
    dispatch(cleanStateTags());
    dispatch(
      changeGroupFiles(
        item.type,
        item.group_uid,
        title,
        year,
        author,
        location,
        comment,
        centuryClient,
        informationClient,
      ),
    );
  };

  const onSuccessHistorian = () => {
    if (!historianText.text && item.type === 'text') {
      return setTextError('Текст не может быть пустым');
    }
    if (!title) {
      return setNameError('Название не может быть пустым');
    }
    if (title.length < 4) {
      return setNameError('В название не может быть меньше 4 символов');
    }
    if (year.length !== 0 && /\D/.test(year)) {
      return setYearError('Год только числа');
    }
    if (year.length !== 0 && +year > currentYear) {
      return setYearError('Год не может быть больше текущего');
    }
    if (author.length !== 0 && author.length < 4) {
      return setAuthorError('Автор не может быть меньше 4 символов');
    }
    if (comment.length !== 0 && comment.length > 200) {
      return setCommentError('В комментарии не может быть больше 200 символов');
    }
    if (author.length !== 0 && /\d/.test(author)) {
      return setAuthorError('В авторе не может быть чисел');
    }
    if (credibilityClient.length === 0) {
      return setCredibilityError(
        'Необходимо добавить хотя бы один тег достоверности',
      );
    }
    if (item.type === 'text') {
      navigate('SendMaterialScreen');
      dispatch(cleanStateTags());
      dispatch(
        setTextHistorian(
          title,
          year,
          author,
          location,
          comment,
          bookmark,
          albums,
          centuryClient,
          informationClient,
          historianText,
          effects,
          credibilityClient,
        ),
      );
      return;
    }
    navigate('SendMaterialScreen');
    dispatch(cleanStateTags());
    dispatch(
      changeHistorianFile(
        item.id,
        item.type,
        title,
        year,
        author,
        location,
        comment,
        bookmark,
        albums,
        centuryClient,
        informationClient,
        effects,
        credibilityClient,
      ),
    );
  };

  const onPressClose = () => {
    navigate('SendMaterialScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onPressClose} style={styles.btn}>
          <Text style={styles.btnText}>отклонить</Text>
        </TouchableOpacity>
        <Text>Настройка</Text>
        <TouchableOpacity
          onPress={role === 'user' ? onSuccessUser : onSuccessHistorian}
          style={styles.btn}
        >
          <Text style={styles.btnText}>изменить</Text>
        </TouchableOpacity>
      </View>
      {nameError && (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
          {nameError}
        </Text>
      )}
      {commentError && (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
          {commentError}
        </Text>
      )}
      {yearError && (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
          {yearError}
        </Text>
      )}
      {authorError && (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
          {authorError}
        </Text>
      )}
      {textError && (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
          {textError}
        </Text>
      )}
      {credibilityError && (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
          {credibilityError}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default AddTagsHeader;
