import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { openPassModal } from '../../redux/ducks/application';

function BtnOpenModal() {
  const dispatch = useDispatch();

  const pressOpenModal = () => {
    dispatch(openPassModal());
  };

  return (
    <TouchableOpacity onPress={pressOpenModal} style={styles.btnPass}>
      <Text style={styles.btnText}>Сменить существующий пароль</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnPass: {
    marginTop: 15,
    padding: 5,
  },
});

export default BtnOpenModal;
