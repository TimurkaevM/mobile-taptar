import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../misc/color';
import { closePassModal } from '../../redux/ducks/application';
import { changeUserPass } from '../../redux/ducks/user';
import CloseIcon from '../../SvgIcons/CloseIcon.jsx/CloseIcon';

const PassChangeModal = () => {
  const dispatch = useDispatch();

  const passModal = useSelector((state) => state.application.passModal);

  const [newPass, setNewPass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [checkPass, setCheckPass] = useState('');

  const [newPassError, setNewPassError] = useState(null);
  const [oldPassError, setOldPassError] = useState(null);
  const [checkPassError, setCheckPassError] = useState(null);

  const handleChangeNewPass = (e) => {
    if (newPassError) {
      setNewPassError(null);
    }
    return;
  };

  const handleChangeCheckPass = (e) => {
    if (checkPassError) {
      setCheckPassError(null);
    }
    return;
  };

  const handleChangeOldPass = (e) => {
    if (oldPassError) {
      setOldPassError(null);
    }
    return;
  };

  const changeCurrentUserPass = () => {
    if (!newPass) {
      setNewPassError('Новый пароль не может быть пустым');
      return;
    }
    if (!checkPass) {
      setCheckPassError('Пароль подтверждения не может быть пустым');
      return;
    }
    if (!oldPass) {
      setOldPassError('Старый пароль не может быть пустым');
      return;
    }
    if (newPass.length < 6) {
      setNewPassError('Новый пароль должен содержать минимум 6 символов');
      return;
    }
    if (oldPass.length < 6) {
      setOldPassError('Старый пароль должен содержать минимум 6 символов');
      return;
    }
    if (newPass.length !== 0 && /\s/.test(newPass)) {
      setNewPassError('В новом пароле не может быть пробелов');
      return;
    }
    if (oldPass.length !== 0 && /\s/.test(oldPass)) {
      setOldPassError('В старом пароле не может быть пробелов');
      return;
    }
    if (newPass !== checkPass) {
      setCheckPassError('Неверный пароль подтверждения');
      return;
    }
    dispatch(changeUserPass(newPass, checkPass, oldPass));
    closeModal();
  };

  const closeModal = () => {
    setNewPass('');
    setCheckPass('');
    setOldPass('');
    setNewPassError(null);
    setCheckPassError(null);
    setOldPassError(null);
    dispatch(closePassModal());
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={passModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        closeModal();
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={closeModal} style={styles.btnClose}>
              <CloseIcon />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Новый пароль</Text>
              <TextInput
                style={styles.subTitle}
                type="name"
                name="newPass"
                value={newPass}
                onChangeText={setNewPass}
                onChange={handleChangeNewPass}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Повторить пароль</Text>
              <TextInput
                style={styles.subTitle}
                type="name"
                name="checkPass"
                value={checkPass}
                onChangeText={setCheckPass}
                onChange={handleChangeCheckPass}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Старый пароль</Text>
              <TextInput
                style={styles.subTitle}
                type="name"
                name="oldPass"
                value={oldPass}
                onChangeText={setOldPass}
                onChange={handleChangeOldPass}
              />
            </View>
            <TouchableOpacity
              onPress={changeCurrentUserPass}
              style={styles.btnSave}
            >
              <Text style={styles.btnSaveText}>Сменить пароль</Text>
            </TouchableOpacity>
            {newPassError && (
              <Text
                style={{
                  marginTop: 20,
                  color: 'red',
                  fontFamily: 'GothamMedium',
                }}
              >
                {newPassError}
              </Text>
            )}
            {oldPassError && (
              <Text
                style={{
                  marginTop: 20,
                  color: 'red',
                  fontFamily: 'GothamMedium',
                }}
              >
                {oldPassError}
              </Text>
            )}
            {checkPassError && (
              <Text
                style={{
                  marginTop: 20,
                  color: 'red',
                  fontFamily: 'GothamMedium',
                  fontFamily: 'GothamMedium',
                }}
              >
                {checkPassError}
              </Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffcc',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#9e9e9e',
  },
  btnClose: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 8,
    right: 10,
  },
  infoContainer: {
    marginTop: 20,
    width: width - 150,
  },
  title: {
    textAlign: 'left',
    fontSize: 13,
    color: '#9b9b9b',
    fontFamily: 'GothamMedium',
  },
  subTitle: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    fontFamily: 'GothamMedium',
  },
  btnSave: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.MAIN_COLOR,
  },
  btnSaveText: {
    color: color.APP_BG,
    fontFamily: 'GothamMedium',
  },
});

export default PassChangeModal;
