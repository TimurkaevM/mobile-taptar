import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserAvatar from '../components/ProfileComponents/UserAvatar';
import CurrentUserInfo from '../components/ProfileComponents/CurrentUserInfo';
import ProfileButtons from '../components/ProfileComponents/ProfileButtons';

function ProfileScreen({ navigation }) {
  const { navigate } = navigation;

  return (
    <View style={styles.container}>
      <UserAvatar />
      <CurrentUserInfo />
      <ProfileButtons navigate={navigate} />
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

export default ProfileScreen;
