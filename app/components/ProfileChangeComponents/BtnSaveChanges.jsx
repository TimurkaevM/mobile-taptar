import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import color from '../../misc/color';
import { changeUserProfile } from '../../redux/ducks/user';

function BtnSaveChanges({ goBack, name, email, setEmailError, setNameError }) {
  const dispatch = useDispatch();

  const pressChangeProfile = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!name) {
      setNameError('Имя не может быть пустым');
      return;
    }
    if (name.length < 3) {
      setNameError('В имени не может быть меньше 3 символов');
      return;
    }
    if (!email) {
      setEmailError('Email не может быть пустым');
      return;
    }
    if (!re.test(String(email).toLowerCase())) {
      setEmailError('Некорректные данные email');
      return;
    }
    goBack();
    dispatch(changeUserProfile(name, email));
  };

  return (
    <TouchableOpacity onPress={pressChangeProfile} style={styles.btnSave}>
      <Text style={styles.btnSaveText}>Сохранить изменения</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnSave: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.MAIN_COLOR,
    color: color.APP_BG,
  },
  btnSaveText: {
    color: color.APP_BG,
  },
});

export default BtnSaveChanges;
