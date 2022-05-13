import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch } from 'react-redux';
import Svg, { Path, G } from 'react-native-svg';

import { sendMaterialStyles } from '../styles/sendMaterialStyles';
import { postFail, postFailDocument } from '../redux/ducks/files';

const AddFileButton = (props) => {
  const [addFile, setAddFile] = useState(false);
  const [image, setImage] = useState(null);

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
        dispatch(postFailDocument(fileToUpload, 'document'));
      }
    });
  };

  const pickAudio = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
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
          type: 'audio/' + fileType,
        };
        props.navigate('ModalAddFile');
        dispatch(postFailDocument(fileToUpload, 'audio'));
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
                props.navigate('ImageBrowserScreen', { media: 'photo' });
              }}
            >
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                space="preserve"
                width={22}
                height={22}
                version="1.1"
                style={{
                  shapeRendering: 'geometricPrecision',
                  textRendering: 'geometricPrecision',
                  imageRendering: 'optimizeQuality',
                  fillRule: 'evenodd',
                  clipRule: 'evenodd',
                }}
                viewBox="0 0 60.72 52.33"
                xlink="http://www.w3.org/1999/xlink"
                xodm="http://www.corel.com/coreldraw/odm/2003"
              >
                <G id="Слой_x0020_1">
                  <Path
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="0.18"
                    strokeMiterlimit="22.9256"
                    d="M36.51 2.1c-0.8,0.06 -1.43,0.73 -1.43,1.54 0,0.86 0.69,1.55 1.55,1.55 0.1,0 0.2,-0.01 0.3,-0.03l1.12 0c0.04,0 0.09,0 0.13,0 0.96,0.07 1.7,0.87 1.7,1.83l0 1.06c-0.03,0.12 -0.05,0.25 -0.05,0.38 0,0.86 0.69,1.55 1.55,1.55 0.82,0 1.5,-0.64 1.55,-1.45l0.02 0 0 -1.53c0,-2.57 -1.99,-4.7 -4.55,-4.89 -0.12,-0.01 -0.24,-0.01 -0.35,-0.01l-1.41 0 -0.12 0 0 0z"
                  />
                  <Path
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="0.18"
                    strokeMiterlimit="22.9256"
                    d="M50.68 10.77c-0.8,0.06 -1.43,0.73 -1.43,1.54 0,0.86 0.69,1.55 1.55,1.55 0.1,0 0.2,-0.01 0.3,-0.03l1.12 0c0.04,0 0.09,0 0.13,0 0.96,0.07 1.7,0.87 1.7,1.83l0 1.06c-0.03,0.12 -0.05,0.25 -0.05,0.38 0,0.86 0.69,1.55 1.55,1.55 0.82,0 1.5,-0.64 1.55,-1.45l0.02 0 0 -1.53c0,-2.57 -1.99,-4.7 -4.55,-4.89 -0.12,-0.01 -0.24,-0.01 -0.35,-0.01l-1.41 0 -0.12 0 0 0z"
                  />
                  <Path
                    fill="#fff"
                    fillRule="nonzero"
                    d="M11.29 28.78c0,-10.53 8.54,-19.07 19.07,-19.07 10.53,0 19.07,8.54 19.07,19.07 0,10.53 -8.54,19.07 -19.07,19.07 -10.53,0 -19.07,-8.54 -19.07,-19.07zm39.51 -14.92c-0.86,0 -1.55,-0.69 -1.55,-1.55 0,-0.81 0.63,-1.48 1.43,-1.54l0 -0 0.12 0 1.41 0c0.12,0 0.24,0 0.35,0.01 2.56,0.18 4.55,2.32 4.55,4.89l0 1.53 -0.02 0c-0.05,0.81 -0.72,1.45 -1.55,1.45 -0.86,0 -1.55,-0.69 -1.55,-1.55 0,-0.13 0.02,-0.26 0.05,-0.38l0 -1.06c0,-0.96 -0.74,-1.76 -1.7,-1.83 -0.04,-0 -0.09,-0 -0.13,-0l-1.12 0c-0.1,0.02 -0.19,0.03 -0.3,0.03zm-10.42 -13.86l-20.05 0c-3.03,0 -5.5,2.46 -5.5,5.5l0 1.92 -9.34 0c-3.03,0 -5.5,2.46 -5.5,5.5l0 33.92c0,3.04 2.46,5.5 5.5,5.5l49.73 0c3.03,0 5.5,-2.46 5.5,-5.5l0 -33.92c0,-3.04 -2.46,-5.5 -5.5,-5.5l-9.34 0 0 -1.92c0,-3.04 -2.46,-5.5 -5.5,-5.5zm-5.29 3.64c0,-0.81 0.63,-1.48 1.43,-1.54l0 -0 0.12 0 1.41 0c0.12,0 0.24,0 0.35,0.01 2.56,0.18 4.55,2.32 4.55,4.89l0 1.53 -0.02 0c-0.05,0.81 -0.72,1.45 -1.55,1.45 -0.86,0 -1.55,-0.69 -1.55,-1.55 0,-0.13 0.02,-0.26 0.05,-0.38l0 -1.06c0,-0.96 -0.74,-1.76 -1.7,-1.83 -0.04,-0 -0.09,-0 -0.13,-0l-1.12 0c-0.1,0.02 -0.19,0.03 -0.3,0.03 -0.86,0 -1.55,-0.69 -1.55,-1.55zm-4.73 9.37c-8.7,0 -15.76,7.06 -15.76,15.76 0,8.7 7.06,15.76 15.76,15.76 8.71,0 15.76,-7.06 15.76,-15.76 0,-8.71 -7.06,-15.76 -15.76,-15.76zm0 5.27c5.79,0 10.49,4.69 10.49,10.49 0,5.79 -4.7,10.49 -10.49,10.49 -5.79,0 -10.49,-4.7 -10.49,-10.49 0,-5.79 4.7,-10.49 10.49,-10.49z"
                  />
                </G>
              </Svg>
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
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                space="preserve"
                width={22}
                height={22}
                version="1.1"
                style={{
                  shapeRendering: 'geometricPrecision',
                  textRendering: 'geometricPrecision',
                  imageRendering: 'optimizeQuality',
                  fillRule: 'evenodd',
                  clipRule: 'evenodd',
                }}
                viewBox="0 0 62.01 48.2"
                xlink="http://www.w3.org/1999/xlink"
                xodm="http://www.corel.com/coreldraw/odm/2003"
              >
                <G id="Слой_x0020_1">
                  <Path
                    fill="#fff"
                    d="M9.36 24.05l43.28 0c1.02,0 1.86,0.84 1.86,1.86 0,1.02 -0.84,1.86 -1.86,1.86l-43.28 0c-1.02,0 -1.86,-0.84 -1.86,-1.86 0,-1.02 0.84,-1.86 1.86,-1.86zm52.65 20.09l0 -31.04c-0.5,0.25 -1.06,0.4 -1.65,0.4l-4.46 0c-4.22,0 -7.65,-3.43 -7.65,-7.65l0 -4.46c0,-0.49 0.1,-0.96 0.28,-1.39l-44.48 0c-2.24,0 -4.06,1.82 -4.06,4.06l0 40.09c0,2.24 1.82,4.06 4.06,4.06l53.9 0c2.24,0 4.06,-1.82 4.06,-4.06zm-52.65 -13.02l43.28 0c1.02,0 1.86,0.84 1.86,1.86 0,1.02 -0.84,1.86 -1.86,1.86l-43.28 0c-1.02,0 -1.86,-0.84 -1.86,-1.86 0,-1.02 0.84,-1.86 1.86,-1.86zm0 6.83l43.28 0c1.02,0 1.86,0.84 1.86,1.86 0,1.02 -0.84,1.86 -1.86,1.86l-43.28 0c-1.02,0 -1.86,-0.84 -1.86,-1.86 0,-1.02 0.84,-1.86 1.86,-1.86zm25.76 -22.1c0,1.02 -0.84,1.86 -1.86,1.86l-23.93 0c-1.02,0 -1.86,-0.84 -1.86,-1.86 0,-1.02 0.84,-1.86 1.86,-1.86l23.93 0c1.02,0 1.86,0.84 1.86,1.86zm-1.86 -5.22l-23.93 0c-1.02,0 -1.86,-0.84 -1.86,-1.86 0,-1.02 0.84,-1.86 1.86,-1.86l23.93 0c1.02,0 1.86,0.84 1.86,1.86 0,1.02 -0.84,1.86 -1.86,1.86zm18.62 -4.78c0,2.22 1.8,4.02 4.02,4.02l4.46 0 -4.6 -4.6 -3.89 -3.89 0 4.46z"
                  />
                </G>
              </Svg>
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
                props.navigate('ImageBrowserScreen', { media: 'video' });
              }}
            >
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                space="preserve"
                width={22}
                height={22}
                version="1.1"
                style={{
                  shapeRendering: 'geometricPrecision',
                  textRendering: 'geometricPrecision',
                  imageRendering: 'optimizeQuality',
                  fillRule: 'evenodd',
                  clipRule: 'evenodd',
                }}
                viewBox="0 0 71.7 63.03"
                xlink="http://www.w3.org/1999/xlink"
                xodm="http://www.corel.com/coreldraw/odm/2003"
              >
                <G id="Слой_x0020_1">
                  <Path
                    fill="#fff"
                    fillRule="nonzero"
                    d="M61.92 4.02c3.18,0 5.76,2.58 5.76,5.77l0 43.47c0,3.19 -2.58,5.77 -5.76,5.77l-52.14 0c-3.18,0 -5.76,-2.58 -5.76,-5.77l0 -43.47c0,-3.18 2.58,-5.77 5.76,-5.77l52.14 0zm0 -4.02l-52.14 0c-5.39,0 -9.78,4.39 -9.78,9.78l0 43.47c0,5.4 4.39,9.78 9.78,9.78l52.14 0c5.39,0 9.78,-4.39 9.78,-9.78l0 -43.47c0,-5.39 -4.39,-9.78 -9.78,-9.78zm-44.59 15.05l0 -4.12c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.12 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.12 0c0.56,0 1.04,-0.21 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.12c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.12 0c-0.56,0 -1.04,0.21 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.12 0c0.56,0 1.04,-0.21 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.12c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.12 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.12 0c0.56,0 1.04,-0.2 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.11c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.12 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.11c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.12 0c0.56,0 1.04,-0.2 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm32.93 -24.69l0 -16.47c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-24.7 0c-0.56,0 -1.04,0.2 -1.44,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 16.47c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.44,0.61l24.7 0c0.56,0 1.04,-0.21 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 24.69l0 -16.46c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-24.7 0c-0.56,0 -1.04,0.2 -1.44,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 16.46c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.44,0.61l24.7 0c0.56,0 1.04,-0.2 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm12.35 -37.04l0 -4.12c0,-0.56 -0.21,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.11 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.11 0c0.56,0 1.04,-0.21 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.12c0,-0.56 -0.21,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.11 0c-0.56,0 -1.04,0.21 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.11 0c0.56,0 1.04,-0.21 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.12c0,-0.56 -0.21,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.11 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.11 0c0.56,0 1.04,-0.2 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.11c0,-0.56 -0.21,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.11 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.11c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.11 0c0.56,0 1.04,-0.2 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45z"
                  />
                </G>
              </Svg>
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
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                space="preserve"
                width={22}
                height={22}
                version="1.1"
                style={{
                  shapeRendering: 'geometricPrecision',
                  textRendering: 'geometricPrecision',
                  imageRendering: 'optimizeQuality',
                  fillRule: 'evenodd',
                  clipRule: 'evenodd',
                }}
                viewBox="0 0 83.88 56.14"
                xlink="http://www.w3.org/1999/xlink"
                xodm="http://www.corel.com/coreldraw/odm/2003"
              >
                <G id="Слой_x0020_1">
                  <Path
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="0.19"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    d="M59.09 19.87c0.1,0.14 0.19,0.28 0.28,0.42 1.49,2.31 2.28,4.97 2.28,7.72 0,2.93 -0.9,5.76 -2.57,8.16l-0.99 1.42c-0.29,0.65 -0.95,1.11 -1.71,1.11 -1.04,0 -1.87,-0.84 -1.87,-1.87 0,-0.47 0.17,-0.9 0.46,-1.22l-0.05 -0.03 1.08 -1.55c1.23,-1.77 1.89,-3.85 1.89,-6.01 0,-2.03 -0.58,-3.98 -1.68,-5.68 -0.07,-0.1 -0.14,-0.21 -0.21,-0.31l-0.91 -1.31c-0.31,-0.33 -0.49,-0.78 -0.49,-1.27 0,-1.04 0.84,-1.87 1.87,-1.87 0.62,0 1.18,0.31 1.52,0.78l0.03 -0.02 1.07 1.55zm5.99 27.11c-0.34,0.38 -0.84,0.62 -1.4,0.62 -1.04,0 -1.87,-0.84 -1.87,-1.87 0,-0.57 0.26,-1.09 0.66,-1.43l1.21 -1.26c3.41,-3.55 5.34,-10.17 5.34,-15.03 0,-4.75 -1.83,-11.11 -5.03,-14.69 -0.07,-0.08 -0.14,-0.16 -0.21,-0.23l-1.11 -1.17c-0.03,-0.03 -0.06,-0.06 -0.09,-0.09l-0.1 -0.1 0.01 -0.01c-0.24,-0.31 -0.38,-0.71 -0.38,-1.13 0,-1.04 0.84,-1.87 1.87,-1.87 0.46,0 0.89,0.17 1.21,0.44l0.02 -0.02 1.29 1.37c0.1,0.1 0.19,0.21 0.28,0.31 3.82,4.28 5.98,11.51 5.98,17.2 0,5.85 -2.29,13.36 -6.38,17.63l-1.3 1.36 -0.02 -0.02zm7.23 6.98c-0.33,0.31 -0.78,0.5 -1.27,0.5 -1.04,0 -1.87,-0.84 -1.87,-1.87 0,-0.54 0.23,-1.03 0.6,-1.38l-0.01 -0.01 1.38 -1.28c5.64,-5.22 8.88,-14.34 8.88,-21.92 0,-7.45 -3.12,-16.35 -8.52,-21.58 -0.08,-0.07 -0.15,-0.15 -0.23,-0.22l-1.37 -1.29 0.01 -0.01c-0.41,-0.34 -0.68,-0.86 -0.68,-1.44 0,-1.04 0.84,-1.87 1.87,-1.87 0.54,0 1.02,0.23 1.36,0.59l0 -0 1.37 1.29c0.09,0.09 0.18,0.17 0.27,0.26 6.14,5.94 9.67,15.81 9.67,24.29 0,8.64 -3.67,18.74 -10.08,24.68l-1.38 1.28 -0.01 -0.01zm-45.93 -35.96c-0.75,-0.86 -0.67,-2.17 0.19,-2.92l6.4 -5.62c0.86,-0.75 2.17,-0.67 2.92,0.19 0.75,0.86 0.67,2.17 -0.19,2.92l-6.4 5.62c-0.86,0.75 -2.17,0.67 -2.92,-0.19zm-9.77 6.25l-8.52 0c-1.14,0 -2.07,-0.93 -2.07,-2.07 0,-1.14 0.93,-2.07 2.07,-2.07l8.52 0c1.14,0 2.07,0.93 2.07,2.07 0,1.14 -0.93,2.07 -2.07,2.07zm17.95 -23.41l-16.22 14.17 -11.89 0c-3.51,0 -6.35,2.85 -6.35,6.35l0 13.41c0,3.51 2.84,6.36 6.35,6.36l11.89 0 16.22 14.17c0.89,0.51 1.83,0.75 2.75,0.75 2.88,0 5.51,-2.3 5.51,-5.52l0 -44.92c0,-3.21 -2.64,-5.51 -5.51,-5.51 -0.92,0 -1.86,0.23 -2.75,0.74z"
                  />
                </G>
              </Svg>
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

export default AddFileButton;
