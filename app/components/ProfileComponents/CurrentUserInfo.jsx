import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

function CurrentUserInfo() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <>
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
    </>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 20,
    width: width - 90,
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9b9b9b',
  },
  subTitle: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default CurrentUserInfo;
