import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch } from 'react-redux';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import { postFailDocument } from '../../redux/ducks/uploadFiles';
import ImageAddBtnIcon from '../../SvgIcons/SendMaterialIcons/ImageAddBtnIcon';
import DocumentAddBtnIcon from '../../SvgIcons/SendMaterialIcons/DocumentAddBtnIcon';
import VideoAddBtnIcon from '../../SvgIcons/SendMaterialIcons/VideoAddBtnIcon';
import AudioAddBtnIcon from '../../SvgIcons/SendMaterialIcons/AudioAddBtnIcon';

const AddBtnsUser = (props) => {
  const [addFile, setAddFile] = useState(false);

  const dispatch = useDispatch();

  const changeAddFile = () => {
    setAddFile(!addFile);
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/*',
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
          type: 'application/' + fileType,
        };
        props.navigate('ModalAddFile');
        dispatch(postFailDocument(fileToUpload, 'document'));
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
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
        <View
          style={{
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={sendMaterialStyles.btnAddMedia}
              title="Pick an image from camera roll"
              onPress={() => {
                props.navigate('ImageBrowserScreen', {
                  media: 'photo',
                  min: 1,
                  max: 5,
                  currentRoom: 'materialUser',
                });
              }}
            >
              <ImageAddBtnIcon />
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 12,
                  textTransform: 'capitalize',
                  color: '#fff',
                }}
              >
                Фото
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={sendMaterialStyles.btnAddMedia}
              title="Pick an image from camera roll"
              onPress={pickDocument}
            >
              <DocumentAddBtnIcon />
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 12,
                  textTransform: 'capitalize',
                  color: '#fff',
                }}
              >
                Документ
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={sendMaterialStyles.btnAddMedia}
              title="Pick an image from camera roll"
              onPress={() => {
                props.navigate('VideoBrowserScreen', {
                  media: 'video',
                  min: 1,
                  max: 5,
                  currentRoom: 'materialUser',
                });
              }}
            >
              <VideoAddBtnIcon />
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 12,
                  textTransform: 'capitalize',
                  color: '#fff',
                }}
              >
                Видео
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={sendMaterialStyles.btnAddMedia}
              title="Pick an image from camera roll"
              onPress={() => {
                props.navigate('AudioListScreen');
              }}
            >
              <AudioAddBtnIcon />
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 12,
                  textTransform: 'capitalize',
                  color: '#fff',
                }}
              >
                Аудио
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default AddBtnsUser;
