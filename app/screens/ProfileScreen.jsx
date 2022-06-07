import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AvatarIcon from '../SvgIcons/AvatarIcon/AvatarIcon';
import { userLogOut } from '../redux/ducks/user';

function ProfileScreen({navigation}) {
  const { navigate } = navigation;

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);

  console.log(currentUser)

  const pressLogOut = () => {
    dispatch(userLogOut());
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {currentUser.avatar ? (
      <Image
      style={styles.avatar}
      source={{
        uri: `https://api.taptar.ru/storage/avatars/${currentUser.avatar}`,
      }}
    />
        ) : (
          <AvatarIcon />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>ФИО</Text>
        <View style={styles.subTitle}>
          <Text style={styles.subTitleText}>{currentUser.name}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Должность</Text>
        <View style={styles.subTitle}>
          <Text style={styles.subTitleText}>{currentUser.role}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Почта</Text>
        <View style={styles.subTitle}>
          <Text style={styles.subTitleText}>{currentUser.email}</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => navigate('ProfileChangeScreen')} style={[styles.btn, {marginRight: 20,}]}>
          <Text style={styles.btnText}>Редактировать</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pressLogOut} style={styles.btn}>
          <Text style={styles.btnText}>Выйти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: '#fff',
    padding: 3,
    marginTop: 20,
    marginBottom: 15,
  },
  avatar: {
    borderRadius: 150,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  infoContainer: {
    marginTop: 20,
    width: width - 90,
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9b9b9b'
  },
  subTitle: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  buttons: {
    width: width - 90,
    marginTop: 28,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnText: {

  },
})

export default ProfileScreen;
