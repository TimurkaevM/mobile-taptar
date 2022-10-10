import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import color from '../../misc/color';
import { openRemoveAccountModal } from '../../redux/ducks/application';

function BtnRemoveAccount() {
  const dispatch = useDispatch();

  const pressChangeProfile = () => {
    dispatch(openRemoveAccountModal());
  };

  return (
    <TouchableOpacity onPress={pressChangeProfile} style={styles.btnSave}>
      <Text style={styles.btnSaveText}>Удалить Аккаунт</Text>
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
    fontFamily: 'GothamMedium',
  },
});

export default BtnRemoveAccount;
