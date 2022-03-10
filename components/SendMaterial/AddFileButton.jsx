import React, { useEffect, useState } from 'react';
import { Image, View, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch } from 'react-redux';
import * as FileSystem from 'expo-file-system';
// import Picker from 'react-native-image-crop-picker';

import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import { postFail } from '../../redux/ducks/files';

const AddFileButton = (props) => {
  const [addFile, setAddFile] = useState(false);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const changeAddFile = () => {
    setAddFile(!addFile);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      dispatch(postFail(result, 'photo'));
      props.openModalAddFile();
    }
  };

  const pickDocument = () => {
    DocumentPicker.getDocumentAsync({
      type: "audio/*",
      copyToCacheDirectory: false,
    }).then(({uri}) => {
      FileSystem.downloadAsync(
          uri, 
           FileSystem.documentDirectory + '<file name>')
      .then(({uri}) => {
           FileSystem.readAsStringAsync(uri)
      }).then(result => {
       console.log(result)
   });
  });
		  // alert(result.uri);
      // console.log(result);
        // setImage(result.uri);
        // dispatch(postFail(result, 'audio'));
      //   props.openModalAddFile();
      // let fff = await FileSystem.readAsStringAsync(result.uri);
      // console.log(fff)
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      dispatch(postFail(result, 'video'));
      props.openModalAddFile();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity
        style={
          addFile ? sendMaterialStyles.btnAddActive : sendMaterialStyles.btnAdd
        }
        title="Pick an image from camera roll"
        onPress={changeAddFile}
      >
        <Icon
          style={addFile ? sendMaterialStyles.iconAdd : null}
          name="add"
          color="#000"
          size={24}
        />
      </TouchableOpacity>
      {!addFile ? (
        <Text
          onPress={changeAddFile}
          style={{ marginLeft: 10, fontSize: 12, textTransform: 'uppercase' }}
        >
          Добавить файл
        </Text>
      ) : (
        <React.Fragment>
          <TouchableOpacity
            style={sendMaterialStyles.btnAddAudio}
            title="Pick an image from camera roll"
            onPress={pickDocument}
          >
            <Icon name="photo" color="#000" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={sendMaterialStyles.btnAddVideo}
            title="Pick an image from camera roll"
            onPress={pickVideo}
          >
            <Icon name="videocam" color="#000" size={24} />
          </TouchableOpacity>
        </React.Fragment>
      )}
    </View>
  );
};

export default AddFileButton;
