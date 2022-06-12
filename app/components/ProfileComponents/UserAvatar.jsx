import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import AvatarIcon from '../../SvgIcons/AvatarIcon/AvatarIcon';

function UserAvatar() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <View style={styles.avatarContainer}>
      {currentUser.avatar ? (
        <Image
          style={styles.avatar}
          source={{
            uri: `https://api.taptar.ru/storage/avatars/${currentUser.avatar}`,
          }}
        />
      ) : (
        <AvatarIcon color="#BED1E6" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    resizeMode: 'cover',
  },
});

export default UserAvatar;
