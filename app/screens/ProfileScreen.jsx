import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

function ProfileScreen({navigation}) {
  const currentUser = useSelector(state => state.user.currentUser);

  console.log(currentUser)

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
      <Image
          style={styles.avatar}
          source={{
            uri: `https://api.taptar.ru/storage/avatars/${currentUser.avatar}`,
          }}
        />
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
  },
  avatar: {
    borderRadius: 150,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
})

export default ProfileScreen;
