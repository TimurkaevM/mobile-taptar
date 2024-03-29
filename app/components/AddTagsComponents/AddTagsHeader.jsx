import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import color from '../../misc/color';
import { useDispatch, useSelector } from 'react-redux';
import { cleanStateTags } from '../../redux/ducks/userTags';
import { cleanUploadFiles } from '../../redux/ducks/uploadFiles';
import {
  removeFile,
  removeFiles,
  uploadGroupFiles,
  uploadOneFile,
  uploadTextFail,
} from '../../redux/actions/material';
import {
  removeFileHistorian,
  uploadFileHistorian,
  uploadTextHistorian,
} from '../../redux/actions/historianMaterial';

const AddTagsHeader = ({
  navigate,
  nameError,
  textError,
  yearError,
  authorError,
  commentError,
  credibilityError,
  setCredibilityError,
  setAuthorError,
  setCommentError,
  setNameError,
  setTextError,
  setYearError,
  materialText,
}) => {
  const dispatch = useDispatch();

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();

  const files = useSelector((state) => state.uploadFiles.files);
  const title = useSelector((state) => state.userTags.title);
  const year = useSelector((state) => state.userTags.year);
  const location = useSelector((state) => state.userTags.location);
  const bookmark = useSelector((state) => state.userTags.bookmark);
  const albums = useSelector((state) => state.userTags.albums);
  const effects = useSelector((state) => state.userTags.effects);
  const comment = useSelector((state) => state.userTags.comment);
  const centuriesClient = useSelector((state) => state.userTags.tags_century);
  const typesClient = useSelector((state) => state.userTags.tags_information);
  const credibilityClient = useSelector(
    (state) => state.userTags.tags_credibility,
  );
  const author = useSelector((state) => state.userTags.author);
  const userText = useSelector((state) => state.sendMaterial.materials.text);
  const historianText = useSelector(
    (state) => state.historianMaterial.materials.text,
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  const { role } = currentUser;

  const onSuccessUser = () => {
    if (!userText.text && materialText) {
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
    if (materialText) {
      navigate('SendMaterialScreen');
      dispatch(cleanStateTags());
      dispatch(cleanUploadFiles());
      dispatch(
        uploadTextFail(
          title,
          year,
          author,
          location,
          comment,
          centuriesClient,
          typesClient,
          userText.text,
        ),
      );
      return;
    }
    if (!files.group) {
      navigate('SendMaterialScreen');
      dispatch(cleanStateTags());
      dispatch(cleanUploadFiles());
      dispatch(
        uploadOneFile(
          files,
          files.type,
          title,
          year,
          author,
          location,
          comment,
          centuriesClient,
          typesClient,
        ),
      );
      return;
    }
    navigate('SendMaterialScreen');
    dispatch(cleanStateTags());
    dispatch(cleanUploadFiles());
    dispatch(
      uploadGroupFiles(
        files,
        files.type,
        title,
        year,
        author,
        location,
        comment,
        centuriesClient,
        typesClient,
      ),
    );
  };

  const onSuccessHistorian = () => {
    if (!historianText.text && materialText) {
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
    if (materialText) {
      navigate('SendMaterialScreen');
      dispatch(cleanStateTags());
      dispatch(cleanUploadFiles());
      dispatch(
        uploadTextHistorian(
          title,
          year,
          author,
          location,
          comment,
          bookmark,
          albums,
          centuriesClient,
          typesClient,
          historianText.text,
          effects,
          credibilityClient,
        ),
      );
      return;
    }
    navigate('SendMaterialScreen');
    dispatch(cleanStateTags());
    dispatch(cleanUploadFiles());
    dispatch(
      uploadFileHistorian(
        files,
        files.type,
        title,
        year,
        author,
        location,
        comment,
        bookmark,
        albums,
        centuriesClient,
        typesClient,
        effects,
        credibilityClient,
      ),
    );
  };

  const onPressCloseUser = () => {
    if (materialText) {
      dispatch(cleanStateTags());
      dispatch(cleanUploadFiles());
      navigate('SendMaterialScreen');
      return;
    }
    if (files.group) {
      dispatch(cleanStateTags());
      dispatch(cleanUploadFiles());
      dispatch(removeFiles(files));
      navigate('SendMaterialScreen');
      return;
    }
    dispatch(cleanStateTags());
    dispatch(cleanUploadFiles());
    dispatch(removeFile(files));
    navigate('SendMaterialScreen');
  };

  const onPressCloseHistorian = () => {
    if (materialText) {
      dispatch(cleanStateTags());
      dispatch(cleanUploadFiles());
      navigate('SendMaterialScreen');
      return;
    }
    dispatch(cleanStateTags());
    dispatch(cleanUploadFiles());
    dispatch(removeFileHistorian(files));
    navigate('SendMaterialScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={role === 'user' ? onPressCloseUser : onPressCloseHistorian}
          style={styles.btn}
        >
          <Text style={styles.btnText}>отклонить</Text>
        </TouchableOpacity>
        <Text>Настройка</Text>
        <TouchableOpacity
          onPress={role === 'user' ? onSuccessUser : onSuccessHistorian}
          style={styles.btn}
        >
          <Text style={styles.btnText}>отправить</Text>
        </TouchableOpacity>
      </View>
      {nameError && <Text style={styles.textError}>{nameError}</Text>}
      {commentError && <Text style={styles.textError}>{commentError}</Text>}
      {yearError && <Text style={styles.textError}>{yearError}</Text>}
      {authorError && <Text style={styles.textError}>{authorError}</Text>}
      {textError && <Text style={styles.textError}>{textError}</Text>}
      {credibilityError && (
        <Text style={styles.textError}>{credibilityError}</Text>
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
    fontFamily: 'GothamMedium',
  },
  textError: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'GothamMedium',
  },
});

export default AddTagsHeader;
