import React from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput } from 'react-native';

function ProfileTextInputs({
  name,
  email,
  emailError,
  nameError,
  setName,
  setEmail,
  setEmailError,
  setNameError,
}) {
  const emailChange = (e) => {
    if (emailError) {
      setEmailError(null);
    }
    return;
  };

  const nameChange = (e) => {
    if (nameError) {
      setNameError(null);
    }
    return;
  };

  return (
    <>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>ФИО</Text>
        <TextInput
          style={styles.subTitle}
          type="name"
          name="currentName"
          value={name}
          onChangeText={setName}
          onChange={nameChange}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Почта</Text>
        <TextInput
          style={styles.subTitle}
          type="email"
          name="currentEmail"
          value={email}
          onChangeText={setEmail}
          onChange={emailChange}
        />
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

export default ProfileTextInputs;
