import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeTitleTag,
  changeAuthorTag,
  changePlaceTag,
  changeYearTag,
  removeCenturies,
  addedCenturies,
  addedTypes,
  removeTypes,
  changeCommentTag,
  UploadOneFail,
} from '../../redux/ducks/files';
import AddInformation from './AddInformation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Video, AVPlaybackStatus } from 'expo-av';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AudioPlayer from '../Media/AudioPlayer';

const AddFileScreen = (props) => {
  const dispatch = useDispatch();

  const progress = useSelector((state) => state.files.progress);
  const loadingFiles = useSelector((state) => state.files.loadingFiles);
  const files = useSelector((state) => state.files.files);
  const centuries = useSelector((state) => state.tags.centuries);
  const types = useSelector((state) => state.tags.types);
  const title = useSelector((state) => state.files.title);
  const year = useSelector((state) => state.files.year);
  const location = useSelector((state) => state.files.location);
  const comment = useSelector((state) => state.files.comment);
  const centuriesClient = useSelector((state) => state.files.tags_century);
  const typesClient = useSelector((state) => state.files.tags_information);
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

  const handleChangeComment = (event) => {
    dispatch(changeCommentTag(event.nativeEvent.text));
  };

  const pressChangeCenturies = (tag, check) => {
    if (check) return dispatch(removeCenturies(tag.id));

    return dispatch(addedCenturies(tag));
  };

  const pressChangeInformation = (tag, check) => {
    if (check) return dispatch(removeTypes(tag.id));

    return dispatch(addedTypes(tag));
  };

  const handleFailAddClick = () => {
    // if (!name) {
    //   return setNameError('Не может быть пустым');
    // }
    // if (name.length < 4) {
    //   return setNameError('Не может быть меньше 4 символов');
    // }
    // if (/\D/.test(year)) {
    //   return setYearError('Только числа');
    // }
    // if (author.length < 4) {
    //   return setAuthorError('Не может быть меньше 4 символов');
    // }
    // if (/\d/.test(author)) {
    //   return setAuthorError('Не может быть чисел');
    // }
    // if (props.type === 'text') {
    //   props.handleClose();
    //   return dispatch(
    //     UploadTextFail(
    //       name,
    //       year,
    //       author,
    //       place,
    //       comment,
    //       centuriesClient,
    //       typesClient,
    //       props.content.text,
    //     ),
    //   );
    // }
    // props.setModalVisible(!props.modalVisible);
    return dispatch(
      UploadOneFail(
        files,
        props.type,
        title,
        year,
        author,
        location,
        comment,
        centuriesClient,
        typesClient,
      ),
    );

    // if (files.files) {
    //   props.handleAddClose();
    //   return dispatch(
    //     UploadGroupFails(
    //       files,
    //       props.type,
    //       name,
    //       year,
    //       author,
    //       place,
    //       comment,
    //       centuriesClient,
    //       typesClient,
    //     ),
    //   );
    // }
  };

  if (loadingFiles)
    return (
      <Text
        style={{
          textAlign: 'left',
          marginBottom: 10,
          textTransform: 'capitalize',
          fontWeight: '400',
          fontSize: 15,
        }}
      >
        {progress}
      </Text>
    );

  return (
    <View style={styles.centeredView}>
      <View style={styles.centeredView}>
        <ScrollView>
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

          <View style={styles.media}>
            {files.type === 'photo' ? (
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: `http://api.taptar.ru/storage/${files.path}`,
                }}
              />
            ) : (
              // <Video
              //   style={styles.tinyLogo}
              //   source={{
              //     uri: `http://api.taptar.ru/storage/${files.path}`,
              //   }}
              //   useNativeControls
              //   resizeMode="contain"
              //   isLooping
              //   // onPlaybackStatusUpdate={status => setStatus(() => status)}
              // />
              <AudioPlayer path={files.path} />
            )}
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
              Комментарий
            </Text>
            <TextInput
              multiline
              numberOfLines={7}
              style={styles.inputComment}
              type="password"
              name="comment"
              value={comment}
              placeholder="Введите комментарий..."
              onChange={handleChangeComment}
            />
          </View>

          <View style={styles.inputTitleContainer}>
            <Text>Тип/Принадлежность:</Text>
            <View style={styles.flexTags}>
              {types.map((item) => {
                const check = typesClient.some((type) => type.id === item.id);

                const backgroundColor = check ? '#4686cc' : '#bed1e6';
                const color = check ? 'white' : 'white';

                return (
                  <AddInformation
                    check={check}
                    key={item.id}
                    item={item}
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
                    handlePress={pressChangeInformation}
                  />
                );
              })}
            </View>
          </View>

          <View style={styles.inputTitleContainer}>
            <Text>Период/Век:</Text>
            <View style={styles.flexTags}>
              {centuries.map((item) => {
                const check = centuriesClient.some(
                  (century) => century.id === item.id,
                );

                const backgroundColor = check ? '#4686cc' : '#bed1e6';
                const color = check ? 'white' : 'white';

                return (
                  <AddInformation
                    check={check}
                    key={item.id}
                    item={item}
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
                    handlePress={pressChangeCenturies}
                  />
                );
              })}
            </View>
          </View>

          <View style={styles.changeBtn}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleFailAddClick}
            >
              <Text style={styles.textStyle}>Применить</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  centeredView: {
    flex: 1,
    backgroundColor: '#fff',
  },

  modalView: {
    margin: 20,
    alignItems: 'flex-start',
  },

  changeBtn: {
    margin: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  media: {
    height: 300,
    overflow: 'hidden',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  btnClose: {
    borderRadius: 20,
    padding: 10,
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textBtnClose: {
    color: '#2196F3',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

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

  inputComment: {
    width: '100%',
    height: 200,
    padding: 20,
    borderWidth: 0.1,
    borderRadius: 2,
    marginBottom: 20,
    backgroundColor: '#fafafa',
    color: '#000',
    fontSize: 13,
    textAlignVertical: 'top',
  },

  flexTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default AddFileScreen;
