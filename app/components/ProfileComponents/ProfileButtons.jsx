import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { userLogOut } from '../../redux/ducks/user';

function ProfileButtons({ navigate }) {
  const dispatch = useDispatch();

  const pressLogOut = () => {
    dispatch(userLogOut());
  };

  return (
    <View style={styles.buttons}>
      <TouchableOpacity
        onPress={() => navigate('ProfileChangeScreen')}
        style={[styles.btn, { marginRight: 20 }]}
      >
        <Text style={styles.btnText}>Редактировать</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pressLogOut} style={styles.btn}>
        <Text style={styles.btnText}>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  buttons: {
    width: width - 90,
    marginTop: 28,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnText: {
    fontFamily: 'GothamLight',
  },
});

export default ProfileButtons;
