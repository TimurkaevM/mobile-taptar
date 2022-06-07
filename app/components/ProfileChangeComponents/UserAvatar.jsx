import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import AvatarAddIcon from '../../SvgIcons/AvatarIcon/AvatarAddIcon';
import { addAvatar } from '../../redux/ducks/user';
import color from '../../misc/color';

function UserAvatar() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const pickPhoto = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
      copyToCacheDirectory: true,
    }).then((response) => {
      if (response.type == 'success') {
        let { name, size, uri } = response;

        if (Platform.OS === 'android' && uri[0] === '/') {
          uri = `file://${uri}`;
          uri = uri.replace(/%/g, '%25');
        }

        let nameParts = name.split('.');
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: 'image/' + fileType,
        };
        dispatch(addAvatar(fileToUpload));
      }
    });
  };
  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     let { uri } = result;

  //       if (Platform.OS === 'android' && uri[0] === '/') {
  //         uri = `file://${uri}`;
  //         uri = uri.replace(/%/g, '%25');
  //       }

  //       let nameParts = uri.split('.');
  //       let fileType = nameParts[nameParts.length - 1];
  //       let fileToUpload = {
  //         uri: uri,
  //         type: 'image/' + fileType,
  //       };
  //       dispatch(addAvatar(fileToUpload));
  //   }
  // };

  return (
    <TouchableOpacity onPress={pickPhoto} style={styles.avatarContainer}>
      {currentUser.avatar ? (
        <Image
          style={styles.avatar}
          source={{
            uri: `https://api.taptar.ru/storage/avatars/${currentUser.avatar}`,
          }}
        />
      ) : null}
      <View style={styles.addIcon}>
        <AvatarAddIcon />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    zIndex: 1,
    width: 150,
    height: 150,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: '#a3c4df',
  },
  avatar: {
    opacity: 0.6,
    zIndex: 1,
    borderRadius: 150,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  addIcon: {
    position: 'absolute',
    zIndex: 3,
    borderRadius: 150,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: color.APP_BG,
  },
});

export default UserAvatar;
