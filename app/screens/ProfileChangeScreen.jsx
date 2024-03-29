import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import PassChangeModal from '../components/ProfileChangeComponents/PassChangeModal';
import PickUserAvatar from '../components/ProfileChangeComponents/PickUserAvatar';
import ProfileTextInputs from '../components/ProfileChangeComponents/ProfileTextInputs';
import BtnOpenModal from '../components/ProfileChangeComponents/BtnOpenModal';
import BtnSaveChanges from '../components/ProfileChangeComponents/BtnSaveChanges';
import BtnRemoveAccount from '../components/ProfileChangeComponents/BtnRemoveAccount';
import RemoveAccountModal from '../components/ProfileChangeComponents/RemoveAccountModal';

function ProfileChangeScreen({ navigation }) {
  const { goBack, navigate } = navigation;

  const currentUser = useSelector((state) => state.user.currentUser);

  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);

  const [emailError, setEmailError] = React.useState(null);
  const [nameError, setNameError] = React.useState(null);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
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
          <BtnRemoveAccount />
          <RemoveAccountModal />
          <PassChangeModal />
          {emailError && <Text style={styles.textError}>{emailError}</Text>}
          {nameError && <Text style={styles.textError}>{nameError}</Text>}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height - 50,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  textError: {
    marginTop: 20,
    color: 'red',
    fontFamily: 'GothamMedium',
  },
});

export default ProfileChangeScreen;
