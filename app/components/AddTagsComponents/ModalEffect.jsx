import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../misc/color';
import { closeModalEffect } from '../../redux/ducks/application';
import {
  addedEffects,
  changedEffects,
  removeEffects,
} from '../../redux/ducks/userTags';
import MainEffectIcons from '../../SvgIcons/EffectsIcons/MainEffectIcons';
import CloseModalEffectsBtn from './CloseModalEffectsBtn';

const ModalEffect = () => {
  const dispatch = useDispatch();

  const modalVisible = useSelector((state) => state.application.modalEffect);

  const effectsClient = useSelector((state) => state.userTags.effects);

  const { open, item, check } = modalVisible;

  const [comment, setComment] = useState('');

  const addEffectFile = () => {
    dispatch(addedEffects({ ...item, comment }));
    setComment('');
    closeModal();
  };

  const removeEffectFile = () => {
    dispatch(removeEffects(item.id));
    setComment('');
    closeModal();
  };

  const changeEffectFile = () => {
    dispatch(changedEffects({ ...item, comment }));
    setComment('');
    closeModal();
  };

  const closeModal = () => {
    dispatch(closeModalEffect());
    setComment('');
  };

  useEffect(() => {
    if (check) {
      const changeEffect = effectsClient.find(
        (effect) => effect.id === item.id,
      );
      setComment(changeEffect.comment);
    }
  }, [item, check]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        closeModal();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CloseModalEffectsBtn onClose={closeModal} />
          <View style={styles.titleContainer}>
            <MainEffectIcons color="#fff" title={item?.title} size={25} />
            <Text style={styles.modalText}>{item?.title}</Text>
          </View>
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.inputComment}
            type="password"
            name="comment"
            value={comment}
            placeholder="Введите комментарий..."
            onChangeText={setComment}
          />
          {!check ? (
            <TouchableOpacity style={styles.button} onPress={addEffectFile}>
              <Text style={styles.textStyle}>Добавить задачу</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={changeEffectFile}
              >
                <Text style={styles.textStyle}>Изменить задачу</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={removeEffectFile}
              >
                <Text style={styles.textStyle}>Удалить задачу</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffcc',
  },
  modalView: {
    backgroundColor: color.FONT_LIGHT,
    borderRadius: 20,
    padding: 30,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  modalText: {
    marginBottom: 30,
    color: '#fff',
    fontSize: 16,
    marginLeft: 20,
  },
  inputComment: {
    width: 270,
    height: 150,
    padding: 20,
    borderWidth: 0.6,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderColor: color.MAIN_COLOR,
    color: color.MAIN_COLOR,
    fontSize: 13,
    textAlignVertical: 'top',
  },
  btnContainer: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    borderWidth: 1,
    borderColor: color.APP_BG,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ModalEffect;
