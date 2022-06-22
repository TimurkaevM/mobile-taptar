import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import PassChangeModal from '../components/ProfileChangeComponents/PassChangeModal';
import PickUserAvatar from '../components/ProfileChangeComponents/PickUserAvatar';
import ProfileTextInputs from '../components/ProfileChangeComponents/ProfileTextInputs';
import BtnOpenModal from '../components/ProfileChangeComponents/BtnOpenModal';
import BtnSaveChanges from '../components/ProfileChangeComponents/BtnSaveChanges';

function ProfileChangeScreen({ navigation }) {
  const { goBack, navigate } = navigation;

  const currentUser = useSelector((state) => state.user.currentUser);

  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);

  const [emailError, setEmailError] = React.useState(null);
  const [nameError, setNameError] = React.useState(null);

  return (
    <View style={styles.container}>
      <PickUserAvatar navigate={navigate} />
      <ProfileTextInputs
        name={name}
        email={email}
        setEmail={setEmail}
        setEmailError={setEmailError}
        setName={setName}
        setNameError={setNameError}
        nameError={nameError}
        emailError={emailError}
      />
      <BtnOpenModal />
      <BtnSaveChanges
        name={name}
        email={email}
        setEmailError={setEmailError}
        setNameError={setNameError}
        goBack={goBack}
      />
      <PassChangeModal />
      {emailError && (
        <Text style={{ marginTop: 20, color: 'red' }}>{emailError}</Text>
      )}
      {nameError && (
        <Text style={{ marginTop: 20, color: 'red' }}>{nameError}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
});

export default ProfileChangeScreen;
