import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addAvatar, changeUserProfile } from '../redux/ducks/user';
import color from '../misc/color';
import AvatarAddIcon from '../SvgIcons/AvatarIcon/AvatarAddIcon';
import { openPassModal } from '../redux/ducks/application';
import PassChangeModal from '../components/ProfileChangeComponents/PassChangeModal';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

function ProfileChangeScreen({ navigation }) {
  const { navigate } = navigation;

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);

  const [emailError, setEmailError] = React.useState(null);
  const [nameError, setNameError] = React.useState(null);

  const emailChange = (e) => {
    // if (error) {
    //   dispatch(ChangeError());
    //   setEmailError(null);
    //   return;
    // }
    if (emailError) {
      setEmailError(null);
      return;
    }
    return;
  };
  const nameChange = (e) => {
    // if (error) {
    //   dispatch(ChangeError());
    //   setNameError(null);
    //   return;
    // }
    if (nameError) {
      setNameError(null);
      return;
    }
    return;
  };

  console.log(currentUser);

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

  const pressOpenModal = () => {
    dispatch(openPassModal());
  };

  const pressChangeProfile = () => {
    dispatch(changeUserProfile(name, email));
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.infoContainer}>
        <Text style={styles.title}>ФИО</Text>
        <TextInput
          style={styles.subTitle}
          type="name"
          name="currentName"
          value={name}
          onChangeText={setName}
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
        />
      </View>

      <TouchableOpacity onPress={pressOpenModal} style={styles.btnPass}>
        <Text style={styles.btnText}>Сменить существующий пароль</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pressChangeProfile} style={styles.btnSave}>
        <Text style={styles.btnSaveText}>Сохранить изменения</Text>
      </TouchableOpacity>

      <PassChangeModal />
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
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  btnSave: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.MAIN_COLOR,
    color: color.APP_BG,
  },
  btnSaveText: {
    color: color.APP_BG,
  },
  btnPass: {
    marginTop: 15,
    padding: 5,
  },
});

export default ProfileChangeScreen;
