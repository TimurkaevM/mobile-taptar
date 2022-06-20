import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch } from 'react-redux';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import { postFileHistorian } from '../../redux/ducks/uploadFiles';
import ImageAddBtnIcon from '../../SvgIcons/SendMaterialIcons/ImageAddBtnIcon';
import DocumentAddBtnIcon from '../../SvgIcons/SendMaterialIcons/DocumentAddBtnIcon';
import VideoAddBtnIcon from '../../SvgIcons/SendMaterialIcons/VideoAddBtnIcon';
import AudioAddBtnIcon from '../../SvgIcons/SendMaterialIcons/AudioAddBtnIcon';

const AddBtnsHistorian = (props) => {
  const [addFile, setAddFile] = useState(false);

  const dispatch = useDispatch();

  const changeAddFile = () => {
    setAddFile(!addFile);
  };

  const pickFile = async (mediaType, sendType) => {
    let result = await DocumentPicker.getDocumentAsync({
      type: `${sendType}/*`,
      copyToCacheDirectory: true,
    });

    if (result.type === 'success') {
      let { name, size, uri, mimeType } = result;

      if (Platform.OS === 'android' && uri[0] === '/') {
        uri = `file://${uri}`;
        uri = uri.replace(/%/g, '%25');
      }

      const fileToUpload = {
        name: name,
        size: size,
        uri: uri,
        type: mimeType,
      };
      props.navigate('ModalAddFile');
      dispatch(postFileHistorian(fileToUpload, mediaType));
    }
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
              onPress={() => pickFile('photo', 'image')}
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
              onPress={() => pickFile('document', 'application')}
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
              onPress={() => pickFile('video', 'video')}
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
              onPress={() => pickFile('audio', 'audio')}
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

export default AddBtnsHistorian;
