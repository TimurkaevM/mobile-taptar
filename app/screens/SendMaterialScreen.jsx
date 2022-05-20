import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeText, changeTitle } from '../redux/ducks/files';
import AddFileButton from '../components/AddFileButton';
import { Video } from 'expo-av';
import Svg, { Path, G, Circle } from 'react-native-svg';

import { sendMaterialStyles } from '../styles/sendMaterialStyles';
import DeleteFileModal from '../components/DeleteFileModal';
import DeleteBtn from '../SvgIcons/DeleteBtn';

function SendMaterialScreen(props) {
  const { navigate, push } = props.navigation;

  const dispatch = useDispatch();

  const files = useSelector((state) => state.files.files);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const title = useSelector((state) => state.files.materials.title);
  const text = useSelector((state) => state.files.materials.text);
  const photo = useSelector((state) => state.files.materials.photo.one);
  const video = useSelector((state) => state.files.materials.video.one);
  const audio = useSelector((state) => state.files.materials.audio.one);
  const document = useSelector((state) => state.files.materials.document.one);
  const videos = useSelector((state) => state.files.materials.video.group);
  const photos = useSelector((state) => state.files.materials.photo.group);
  const audios = useSelector((state) => state.files.materials.audio.group);
  const documents = useSelector(
    (state) => state.files.materials.document.group,
  );

  const handleChangeTitle = (event) => {
    dispatch(changeTitle(event.nativeEvent.text));
  };

  const handleChangeText = (event) => {
    dispatch(changeText(event.nativeEvent.text));
  };

  const renderImage = ({ item }) => {
    const title = item.title === null ? '' : item.title;
    const titleSub = title.substr(0, 12);
    const titleFile = title;

    const changeTitle = titleFile.length >= 12 ? `${titleSub}...` : titleFile;

    return (
      <View>
        <View style={sendMaterialStyles.mediaBox}>
        <DeleteBtn openModal={openModal} />
        <Pressable style={{width: '100%', height: '100%'}} onPress={() => console.log('ddd')}>
        <Image
            style={sendMaterialStyles.mediaImage}
            source={{
              uri: `https://api.taptar.ru/storage/${item.path}`,
            }}
          />
        </Pressable>
        </View>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 10,
            fontWeight: '400',
            fontSize: 15,
          }}
        >
          {title ? changeTitle : 'Нет названия'}
        </Text>
      </View>
    );
  };

  const renderImages = ({ item }) => {
    const title = item.files[0].title === null ? '' : item.files[0].title;
    const titleSub = title.substr(0, 12);
    const titleFile = title;

    const changeTitle = titleFile.length >= 12 ? `${titleSub}...` : titleFile;

    return (
      <View>
        <View style={sendMaterialStyles.mediaBox}>
          <Image
            style={sendMaterialStyles.mediaImage}
            source={{
              uri: `https://api.taptar.ru/storage/${item.files[0].path}`,
            }}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 10,
            fontWeight: '400',
            fontSize: 15,
          }}
        >
          {title ? changeTitle : 'Нет названия'}
        </Text>
      </View>
    );
  };

  const renderVideo = ({ item }) => (
    <View style={sendMaterialStyles.mediaBox}>
      <Video
        style={sendMaterialStyles.mediaImage}
        source={{
          uri: `https://api.taptar.ru/storage/${item.path}`,
        }}
        useNativeControls={false}
        resizeMode="contain"
        // isLooping
      />
    </View>
  );

  const renderVideos = ({ item }) => (
    <View style={sendMaterialStyles.mediaBox}>
      <Video
        style={sendMaterialStyles.mediaImage}
        source={{
          uri: `https://api.taptar.ru/storage/${item.files[0].path}`,
        }}
        useNativeControls={false}
        resizeMode="contain"
        // isLooping
      />
    </View>
  );

  const renderDocument = ({ item }) => (
    <View style={sendMaterialStyles.mediaBoxBlue}>
      <Svg
        width={100}
        height={100}
        xmlns="http://www.w3.org/2000/svg"
        space="preserve"
        version="1.1"
        viewBox="0 0 58.88 84.18"
        xmxlink="http://www.w3.org/1999/xlink"
        xmxodm="http://www.corel.com/coreldraw/odm/2003"
      >
        <G id="Слой_x0020_1">
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M17.38 63.38l24.12 0c1.33,0 2.42,-1.09 2.42,-2.42 0,-1.33 -1.09,-2.42 -2.42,-2.42l-24.12 0c-1.33,0 -2.42,1.09 -2.42,2.42 0,1.33 1.09,2.42 2.42,2.42z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M41.5 67.43l-24.12 0c-1.33,0 -2.42,1.09 -2.42,2.42 0,1.33 1.09,2.42 2.42,2.42l24.12 0c1.33,0 2.42,-1.09 2.42,-2.42 0,-1.33 -1.09,-2.42 -2.42,-2.42z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M26.4 7.09l4.78 0c0,-0.05 0,-0.1 0,-0.15 0,-1.32 -1.07,-2.39 -2.39,-2.39 -1.32,0 -2.39,1.07 -2.39,2.39 0,0.05 0,0.1 0,0.15zm-4.55 0c-0,-0.05 -0,-0.1 -0,-0.15 0,-3.83 3.11,-6.94 6.94,-6.94 3.83,0 6.94,3.11 6.94,6.94 0,0.05 -0,0.1 -0,0.15l1.77 0c2.13,0 3.88,1.75 3.88,3.88l0 11.68 -24.85 0 0 -11.68c0,-2.13 1.74,-3.88 3.88,-3.88l1.44 0zm-0.91 11.12l16.45 0 0 -5.27c0,-1 -0.82,-1.82 -1.82,-1.82l-12.8 0c-1.01,0 -1.83,0.82 -1.83,1.83l0 5.26z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M10.22 16.52c-3.12,0 -5.67,2.55 -5.67,5.67l0 51.76c0,3.12 2.55,5.67 5.67,5.67l38.44 0c3.12,0 5.67,-2.55 5.67,-5.67l0 -51.76c0,-3.12 -2.55,-5.67 -5.67,-5.67l-3.89 0 0 -4.55 3.89 0c5.62,0 10.22,4.6 10.22,10.22l0 51.76c0,5.62 -4.6,10.22 -10.22,10.22l-38.44 0c-5.62,0 -10.22,-4.6 -10.22,-10.22l0 -51.76c0,-5.62 4.6,-10.22 10.22,-10.22l2.91 0 0 4.55 -2.91 0z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M17.38 44.78l24.12 0c1.33,0 2.42,-1.09 2.42,-2.42 0,-1.33 -1.09,-2.42 -2.42,-2.42l-24.12 0c-1.33,0 -2.42,1.09 -2.42,2.42 0,1.33 1.09,2.42 2.42,2.42z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M41.5 48.83l-24.12 0c-1.33,0 -2.42,1.09 -2.42,2.42 0,1.33 1.09,2.42 2.42,2.42l24.12 0c1.33,0 2.42,-1.09 2.42,-2.42 0,-1.33 -1.09,-2.42 -2.42,-2.42z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M41.5 30.58l-24.12 0c-1.33,0 -2.42,1.09 -2.42,2.42 0,1.33 1.09,2.42 2.42,2.42l24.12 0c1.33,0 2.42,-1.09 2.42,-2.42 0,-1.33 -1.09,-2.42 -2.42,-2.42z"
          />
        </G>
      </Svg>
    </View>
  );

  const renderAudio = ({ item }) => (
    <View style={sendMaterialStyles.mediaBoxBlue}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        space="preserve"
        width={90}
        height={55}
        style={{
          marginBottom: 10,
        }}
        version="1.1"
        viewBox="0 0 100.82 72.1"
        xlink="http://www.w3.org/1999/xlink"
        xodm="http://www.corel.com/coreldraw/odm/2003"
      >
        <G id="Слой_x0020_1">
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M46.16 0c-0,0 -0,0 -0,0 -1.99,0 -3.97,0.53 -5.72,1.54 -0.31,0.18 -0.59,0.38 -0.86,0.62l-16.22 14.17 -10.98 0c-6.83,0 -12.38,5.55 -12.38,12.38l0 14.68c0,6.83 5.55,12.38 12.38,12.38l10.98 0 16.22 14.17c0.26,0.23 0.55,0.44 0.86,0.61 1.75,1.01 3.73,1.54 5.72,1.54 6.32,0 11.46,-5.14 11.46,-11.46l0 -49.18c0,-6.32 -5.14,-11.46 -11.46,-11.46zm-0 5.42c3.15,0 6.04,2.52 6.04,6.03l0 49.18c0,3.52 -2.89,6.04 -6.04,6.04 -1,0 -2.03,-0.26 -3.01,-0.82l-17.76 -15.51 -13.01 -0c-3.84,0 -6.95,-3.11 -6.95,-6.96l0 -14.68c0,-3.84 3.11,-6.96 6.95,-6.96l13.01 0 17.76 -15.51c0.97,-0.56 2,-0.82 3.01,-0.82z"
          />
          <Path
            fill="none"
            fillRule="nonzero"
            stroke="#fff"
            strokeWidth="4.46"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M14.11 29.57l9.39 0m12.56 -6.39l7.16 -6.09"
          />
          <Path
            fill="none"
            fillRule="nonzero"
            stroke="#fff"
            strokeWidth="4.85"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M68.32 27.25c1.73,2.5 2.74,5.5 2.74,8.72 0,3.24 -1.01,6.25 -2.76,8.75m9.41 -28.78c4.41,4.67 7.1,13.23 7.1,20.03 0,6.86 -2.74,15.48 -7.24,20.17m9.27 -48.78c7.12,6.67 11.54,18.33 11.54,28.62 0,10.37 -4.49,22.09 -11.71,28.78"
          />
        </G>
      </Svg>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        space="preserve"
        width={200}
        height={50}
        version="1.1"
        style={{
          shapeRendering: 'geometricPrecision',
          textRendering: 'geometricPrecision',
          imageRendering: 'optimizeQuality',
          filRule: 'evenodd',
          clipRule: 'evenodd',
        }}
        viewBox="0 0 430.57 191.14"
        xlink="http://www.w3.org/1999/xlink"
        xodm="http://www.corel.com/coreldraw/odm/2003"
      >
        <G id="Слой_x0020_1">
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M1.88 132.42c-1.04,-0.19 -1.88,-1.26 -1.88,-2.38 0,-22.98 0,-45.96 0,-68.94 0,-1.13 0.84,-2.2 1.88,-2.39 1.04,-0.19 1.88,0.6 1.88,1.75 0,23.4 0,46.8 0,70.2 0,1.15 -0.84,1.94 -1.88,1.75z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M12.09 162.27c-1.04,-0.31 -1.89,-1.52 -1.89,-2.7 0,-42.67 0,-85.33 0,-128 0,-1.19 0.85,-2.4 1.89,-2.7 1.04,-0.3 1.89,0.43 1.89,1.64 0,43.37 0,86.75 0,130.12 0,1.21 -0.85,1.94 -1.89,1.64z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M22.35 115.32c-1.05,-0.09 -1.89,-1.16 -1.89,-2.39 0,-11.57 0,-23.15 0,-34.72 0,-1.24 0.85,-2.31 1.89,-2.39 1.04,-0.08 1.89,0.87 1.89,2.13 0,11.75 0,23.5 0,35.24 0,1.26 -0.85,2.22 -1.89,2.13z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M32.62 117.01c-1.05,-0.08 -1.9,-1.19 -1.9,-2.48 0,-12.64 0,-25.28 0,-37.92 0,-1.29 0.85,-2.4 1.9,-2.48 1.05,-0.08 1.89,0.91 1.89,2.22 0,12.82 0,25.63 0,38.44 0,1.31 -0.85,2.3 -1.89,2.22z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M42.92 128.14c-1.05,-0.11 -1.9,-1.29 -1.9,-2.62 0,-19.97 0,-39.93 0,-59.9 0,-1.33 0.85,-2.5 1.9,-2.62 1.05,-0.11 1.91,0.89 1.91,2.25 0,20.21 0,40.43 0,60.64 0,1.35 -0.85,2.36 -1.91,2.25z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M53.24 135.03c-1.05,-0.12 -1.91,-1.34 -1.91,-2.72 0,-24.49 0,-48.99 0,-73.49 0,-1.37 0.85,-2.59 1.91,-2.72 1.05,-0.12 1.91,0.91 1.91,2.31 0,24.77 0,49.55 0,74.32 0,1.39 -0.86,2.43 -1.91,2.3z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M63.59 120.18c-1.05,-0.07 -1.91,-1.28 -1.91,-2.7 0,-14.61 0,-29.22 0,-43.83 0,-1.42 0.86,-2.63 1.91,-2.7 1.06,-0.07 1.91,1.04 1.91,2.47 0,14.76 0,29.52 0,44.28 0,1.44 -0.85,2.55 -1.91,2.47z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M73.96 148.6c-1.06,-0.13 -1.92,-1.43 -1.92,-2.89 0,-33.42 0,-66.85 0,-100.28 0,-1.46 0.86,-2.75 1.92,-2.89 1.06,-0.14 1.92,0.95 1.92,2.42 0,33.74 0,67.48 0,101.22 0,1.48 -0.86,2.56 -1.92,2.42z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M84.35 149.89c-1.06,-0.13 -1.92,-1.45 -1.92,-2.94 0,-34.25 0,-68.51 0,-102.76 0,-1.5 0.86,-2.81 1.92,-2.94 1.06,-0.13 1.92,1 1.92,2.5 0,34.54 0,69.09 0,103.63 0,1.51 -0.86,2.63 -1.92,2.51z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M94.75 120.94c-1.06,-0.05 -1.92,-1.34 -1.92,-2.87 0,-15.01 0,-30.01 0,-45.02 0,-1.53 0.86,-2.81 1.92,-2.87 1.06,-0.05 1.92,1.15 1.92,2.7 0,15.12 0,30.24 0,45.36 0,1.54 -0.86,2.75 -1.92,2.7z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M105.18 118.15c-1.06,-0.04 -1.92,-1.34 -1.92,-2.9 0,-13.12 0,-26.24 0,-39.36 0,-1.56 0.86,-2.86 1.92,-2.9 1.06,-0.04 1.93,1.2 1.93,2.77 0,13.21 0,26.42 0,39.63 0,1.58 -0.86,2.81 -1.93,2.77z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M115.62 124.13c-1.06,-0.05 -1.93,-1.38 -1.93,-2.96 0,-17.06 0,-34.13 0,-51.2 0,-1.59 0.86,-2.91 1.93,-2.96 1.06,-0.05 1.93,1.21 1.93,2.8 0,17.17 0,34.34 0,51.51 0,1.6 -0.86,2.86 -1.93,2.81z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M126.07 122.3c-1.06,-0.04 -1.93,-1.38 -1.93,-2.99 0,-15.83 0,-31.66 0,-47.49 0,-1.61 0.87,-2.95 1.93,-3 1.06,-0.04 1.93,1.24 1.93,2.87 0,15.92 0,31.83 0,47.74 0,1.62 -0.87,2.91 -1.93,2.87z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M136.54 119.22c-1.07,-0.03 -1.93,-1.38 -1.93,-3.02 0,-13.76 0,-27.52 0,-41.27 0,-1.64 0.86,-2.98 1.93,-3.02 1.06,-0.03 1.93,1.28 1.93,2.92 0,13.82 0,27.64 0,41.46 0,1.65 -0.87,2.95 -1.93,2.92z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M147.01 117.17c-1.06,-0.03 -1.93,-1.38 -1.93,-3.04 0,-12.38 0,-24.75 0,-37.13 0,-1.65 0.87,-3.02 1.93,-3.04 1.07,-0.02 1.94,1.31 1.94,2.97 0,12.42 0,24.85 0,37.27 0,1.66 -0.87,2.99 -1.94,2.96z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M157.5 177.25c-1.07,-0.07 -1.94,-1.49 -1.94,-3.17 0,-52.35 0,-104.69 0,-157.05 0,-1.67 0.87,-3.09 1.94,-3.17 1.07,-0.07 1.94,1.23 1.94,2.91 0,52.52 0,105.04 0,157.57 0,1.68 -0.87,2.98 -1.94,2.9z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M167.99 155.43c-1.07,-0.05 -1.94,-1.45 -1.94,-3.13 0,-37.82 0,-75.65 0,-113.47 0,-1.68 0.87,-3.09 1.94,-3.13 1.07,-0.04 1.94,1.29 1.94,2.98 0,37.92 0,75.85 0,113.77 0,1.69 -0.87,3.03 -1.94,2.98z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M178.5 130.81c-1.07,-0.02 -1.94,-1.41 -1.94,-3.11 0,-21.42 0,-42.84 0,-64.26 0,-1.7 0.87,-3.09 1.94,-3.11 1.07,-0.02 1.94,1.34 1.94,3.05 0,21.46 0,42.93 0,64.39 0,1.7 -0.87,3.06 -1.94,3.04z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M189 116.61c-1.07,-0.01 -1.94,-1.4 -1.94,-3.11 0,-11.96 0,-23.92 0,-35.88 0,-1.7 0.87,-3.1 1.94,-3.1 1.07,-0.01 1.94,1.37 1.94,3.08 0,11.98 0,23.96 0,35.94 0,1.7 -0.87,3.09 -1.94,3.08z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M199.51 127.49c-1.07,-0.01 -1.94,-1.4 -1.94,-3.12 0,-19.2 0,-38.41 0,-57.61 0,-1.71 0.87,-3.11 1.94,-3.11 1.07,-0.01 1.94,1.37 1.94,3.09 0,19.22 0,38.44 0,57.66 0,1.71 -0.87,3.1 -1.94,3.09z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M210.03 128.74c-1.07,0 -1.94,-1.39 -1.94,-3.11 0,-20.04 0,-40.08 0,-60.13 0,-1.71 0.87,-3.11 1.94,-3.11 1.07,0 1.94,1.39 1.94,3.1 0,20.05 0,40.1 0,60.14 0,1.72 -0.87,3.11 -1.94,3.1z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M220.54 150.99c-1.07,0 -1.94,-1.38 -1.94,-3.1 0,-34.88 0,-69.77 0,-104.65 0,-1.71 0.87,-3.1 1.94,-3.1 1.07,0 1.94,1.4 1.94,3.12 0,34.87 0,69.75 0,104.62 0,1.71 -0.87,3.11 -1.94,3.11z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M231.05 191.14c-1.07,0.02 -1.94,-1.35 -1.94,-3.07 0,-61.67 0,-123.33 0,-185 0,-1.71 0.87,-3.09 1.94,-3.06 1.07,0.02 1.94,1.43 1.94,3.15 0,61.61 0,123.23 0,184.84 0,1.71 -0.87,3.12 -1.94,3.15z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M241.56 122.6c-1.07,0.01 -1.94,-1.37 -1.94,-3.08 0,-15.97 0,-31.94 0,-47.91 0,-1.71 0.87,-3.08 1.94,-3.07 1.07,0.01 1.94,1.4 1.94,3.11 0,15.95 0,31.89 0,47.84 0,1.71 -0.87,3.1 -1.94,3.11z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M252.07 123.66c-1.07,0.02 -1.94,-1.35 -1.94,-3.05 0,-16.69 0,-33.39 0,-50.08 0,-1.7 0.87,-3.07 1.94,-3.05 1.07,0.02 1.94,1.41 1.94,3.1 0,16.66 0,33.32 0,49.98 0,1.7 -0.86,3.09 -1.94,3.1z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M262.57 136.5c-1.07,0.03 -1.94,-1.32 -1.94,-3.01 0,-25.28 0,-50.57 0,-75.85 0,-1.69 0.87,-3.04 1.94,-3.01 1.07,0.03 1.94,1.43 1.94,3.11 0,25.22 0,50.43 0,75.65 0,1.68 -0.87,3.08 -1.94,3.11z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M273.07 143.21c-1.07,0.04 -1.94,-1.28 -1.94,-2.96 0,-29.79 0,-59.58 0,-89.37 0,-1.68 0.87,-3.01 1.94,-2.96 1.07,0.04 1.94,1.44 1.94,3.1 0,29.69 0,59.38 0,89.07 0,1.67 -0.87,3.06 -1.94,3.11z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M283.55 124.14c-1.07,0.03 -1.94,-1.29 -1.94,-2.95 0,-17.08 0,-34.17 0,-51.25 0,-1.66 0.87,-2.98 1.94,-2.95 1.06,0.03 1.93,1.4 1.93,3.05 0,17.02 0,34.03 0,51.04 0,1.66 -0.87,3.03 -1.93,3.06z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M294.03 154.84c-1.07,0.08 -1.93,-1.19 -1.93,-2.84 0,-37.62 0,-75.24 0,-112.86 0,-1.64 0.86,-2.91 1.93,-2.84 1.06,0.08 1.93,1.47 1.93,3.1 0,37.45 0,74.89 0,112.34 0,1.63 -0.86,3.02 -1.93,3.1z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M304.5 154.05c-1.06,0.09 -1.93,-1.16 -1.93,-2.78 0,-37.13 0,-74.26 0,-111.39 0,-1.63 0.86,-2.87 1.93,-2.78 1.06,0.08 1.93,1.46 1.93,3.08 0,36.93 0,73.86 0,110.8 0,1.61 -0.87,2.99 -1.93,3.08z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M314.95 121.89c-1.06,0.05 -1.93,-1.21 -1.93,-2.81 0,-15.67 0,-31.35 0,-47.03 0,-1.6 0.86,-2.86 1.93,-2.81 1.06,0.05 1.93,1.37 1.93,2.95 0,15.59 0,31.17 0,46.75 0,1.59 -0.86,2.91 -1.93,2.95z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M325.39 118.15c-1.06,0.05 -1.93,-1.19 -1.93,-2.77 0,-13.21 0,-26.42 0,-39.63 0,-1.57 0.86,-2.81 1.93,-2.77 1.06,0.05 1.92,1.34 1.92,2.9 0,13.12 0,26.24 0,39.36 0,1.56 -0.86,2.86 -1.92,2.9z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M335.81 123.1c-1.06,0.06 -1.92,-1.15 -1.92,-2.69 0,-16.56 0,-33.12 0,-49.69 0,-1.54 0.86,-2.75 1.92,-2.69 1.06,0.06 1.92,1.35 1.92,2.88 0,16.44 0,32.88 0,49.31 0,1.53 -0.86,2.82 -1.92,2.88z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M346.22 120.4c-1.06,0.06 -1.92,-1.12 -1.92,-2.63 0,-14.8 0,-29.61 0,-44.41 0,-1.51 0.86,-2.69 1.92,-2.63 1.06,0.06 1.92,1.32 1.92,2.81 0,14.68 0,29.36 0,44.04 0,1.5 -0.86,2.76 -1.92,2.81z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M356.61 116.73c-1.06,0.06 -1.92,-1.1 -1.92,-2.57 0,-12.39 0,-24.79 0,-37.18 0,-1.47 0.86,-2.62 1.92,-2.57 1.06,0.05 1.92,1.28 1.92,2.74 0,12.28 0,24.56 0,36.84 0,1.46 -0.86,2.69 -1.92,2.74z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M366.98 114.17c-1.05,0.06 -1.91,-1.07 -1.91,-2.5 0,-10.73 0,-21.47 0,-32.2 0,-1.44 0.86,-2.56 1.91,-2.51 1.05,0.06 1.91,1.25 1.91,2.67 0,10.63 0,21.25 0,31.87 0,1.42 -0.86,2.62 -1.91,2.67z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M377.32 163.23c-1.05,0.21 -1.91,-0.75 -1.91,-2.15 0,-43.68 0,-87.36 0,-131.04 0,-1.39 0.86,-2.36 1.91,-2.14 1.05,0.21 1.91,1.5 1.91,2.88 0,43.19 0,86.38 0,129.57 0,1.38 -0.85,2.67 -1.91,2.88z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M387.65 143.2c-1.05,0.17 -1.91,-0.8 -1.91,-2.15 0,-30.32 0,-60.64 0,-90.96 0,-1.35 0.85,-2.32 1.91,-2.15 1.05,0.17 1.9,1.38 1.9,2.72 0,29.95 0,59.9 0,89.84 0,1.33 -0.85,2.55 -1.9,2.71z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M397.95 122.46c-1.05,0.1 -1.89,-0.87 -1.89,-2.18 0,-16.47 0,-32.95 0,-49.42 0,-1.31 0.85,-2.28 1.89,-2.18 1.05,0.1 1.9,1.23 1.9,2.51 0,16.25 0,32.5 0,48.76 0,1.29 -0.85,2.41 -1.9,2.52z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M408.22 110.94c-1.05,0.07 -1.9,-0.9 -1.9,-2.16 0,-8.81 0,-17.62 0,-26.43 0,-1.26 0.85,-2.23 1.9,-2.16 1.04,0.06 1.89,1.12 1.89,2.35 0,8.68 0,17.36 0,26.04 0,1.24 -0.85,2.29 -1.89,2.36z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M418.47 117.84c-1.04,0.1 -1.89,-0.79 -1.89,-2 0,-13.52 0,-27.04 0,-40.56 0,-1.2 0.85,-2.1 1.89,-2 1.04,0.1 1.88,1.15 1.88,2.33 0,13.3 0,26.6 0,39.89 0,1.18 -0.85,2.23 -1.88,2.33z"
          />
          <Path
            fill="#fff"
            fillRule="nonzero"
            d="M428.69 117.63c-1.04,0.11 -1.88,-0.73 -1.88,-1.89 0,-13.45 0,-26.9 0,-40.35 0,-1.15 0.84,-2 1.88,-1.89 1.04,0.11 1.88,1.12 1.88,2.25 0,13.21 0,26.42 0,39.62 0,1.13 -0.84,2.14 -1.88,2.25z"
          />
        </G>
      </Svg>
    </View>
  );

  return (
    <ScrollView>
      <View style={sendMaterialStyles.inputTitleContainer}>
        <Text
          style={{
            textAlign: 'left',
            marginBottom: 10,
            fontWeight: '400',
            fontSize: 15,
          }}
        >
          Название материала
        </Text>
        <TextInput
          style={sendMaterialStyles.inputTitle}
          type="password"
          name="title"
          value={title}
          placeholder="Введите название"
          onChange={handleChangeTitle}
        />
      </View>

      <View style={sendMaterialStyles.inputTitleContainer}>
        <Text
          style={{
            textAlign: 'left',
            marginBottom: 10,
            fontWeight: '400',
            fontSize: 15,
          }}
        >
          Текст материала
        </Text>
        <TextInput
          multiline
          numberOfLines={7}
          style={sendMaterialStyles.inputText}
          type="password"
          name="title"
          value={text.text}
          placeholder="Введите текст"
          onChange={handleChangeText}
        />
      </View>

      <AddFileButton
        push={push}
        navigate={navigate}
      />

      {photo.length ? (
        <View style={sendMaterialStyles.inputTitleContainer}>
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 15,
              borderBottomWidth: 1,
              marginBottom: 10,
              alignItems: 'center',
              borderColor: '#000',
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              space="preserve"
              width={28}
              height={28}
              version="1.1"
              style={{
                shapeRendering: 'geometricPrecision',
                textRendering: 'geometricPrecision',
                imageRendering: 'optimizeQuality',
                fillRule: 'evenodd',
                clipRule: 'evenodd',
              }}
              viewBox="0 0 76.78 67.36"
              xlink="http://www.w3.org/1999/xlink"
              xodm="http://www.corel.com/coreldraw/odm/2003"
            >
              <G id="Слой_x0020_1">
                <Path
                  fill="#000"
                  fillRule="nonzero"
                  d="M49.64 0l-22.51 0c-5.04,0 -9.26,3.58 -10.25,8.33l-6.4 0c-5.78,0 -10.47,4.7 -10.47,10.48l0 38.08c0,5.78 4.7,10.48 10.47,10.48l55.83 0c5.77,0 10.47,-4.7 10.47,-10.48l0 -38.08c0,-5.78 -4.7,-10.48 -10.47,-10.48l-6.41 0c-0.99,-4.75 -5.21,-8.33 -10.25,-8.33zm0 4.3c3.41,0 6.17,2.76 6.17,6.17l0 2.16 10.49 0c3.4,0 6.17,2.76 6.17,6.17l0 38.08c0,3.41 -2.77,6.17 -6.17,6.17l-55.83 0c-3.41,0 -6.17,-2.76 -6.17,-6.17l0 -38.08c0,-3.41 2.77,-6.17 6.17,-6.17l10.49 0 0 -2.16c0,-3.41 2.77,-6.17 6.17,-6.17l22.51 0zm0.52 32.31c0,6.51 -5.27,11.78 -11.78,11.78 -6.5,0 -11.78,-5.27 -11.78,-11.78 0,-6.51 5.27,-11.78 11.78,-11.78 6.51,0 11.78,5.27 11.78,11.78zm9.63 0c0,11.82 -9.59,21.41 -21.41,21.41 -11.82,0 -21.41,-9.59 -21.41,-21.41 0,-11.82 9.59,-21.41 21.41,-21.41 11.82,0 21.41,9.58 21.41,21.41zm-3.71 0c0,-9.78 -7.92,-17.7 -17.7,-17.7 -9.77,0 -17.7,7.92 -17.7,17.7 0,9.77 7.92,17.7 17.7,17.7 9.78,0 17.7,-7.92 17.7,-17.7z"
                />
                <Path
                  fill="none"
                  fillRule="nonzero"
                  stroke="#000"
                  strokeWidth="4.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  d="M47.02 8.37c2.09,0 3.78,1.69 3.78,3.78"
                />
                <Path
                  fill="none"
                  fillRule="nonzero"
                  stroke="#000"
                  strokeWidth="4.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  d="M64.14 18.02c1.98,0 3.59,1.61 3.59,3.59"
                />
              </G>
            </Svg>
            <Text
              style={{
                textAlign: 'left',
                fontWeight: '400',
                fontSize: 15,
                marginLeft: 10,
              }}
            >
              Фото
            </Text>
          </View>
          <FlatList
            horizontal
            data={photo}
            renderItem={renderImage}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      ) : null}

      {photos.length ? (
        <View style={sendMaterialStyles.inputTitleContainer}>
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 15,
              borderBottomWidth: 1,
              marginBottom: 10,
              borderColor: '#000',
              alignItems: 'center',
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              space="preserve"
              width={28}
              height={28}
              version="1.1"
              style={{
                shapeRendering: 'geometricPrecision',
                textRendering: 'geometricPrecision',
                imageRendering: 'optimizeQuality',
                fillRule: 'evenodd',
                clipRule: 'evenodd',
              }}
              viewBox="0 0 76.78 67.36"
              xlink="http://www.w3.org/1999/xlink"
              xodm="http://www.corel.com/coreldraw/odm/2003"
            >
              <G id="Слой_x0020_1">
                <Path
                  fill="#000"
                  fillRule="nonzero"
                  d="M49.64 0l-22.51 0c-5.04,0 -9.26,3.58 -10.25,8.33l-6.4 0c-5.78,0 -10.47,4.7 -10.47,10.48l0 38.08c0,5.78 4.7,10.48 10.47,10.48l55.83 0c5.77,0 10.47,-4.7 10.47,-10.48l0 -38.08c0,-5.78 -4.7,-10.48 -10.47,-10.48l-6.41 0c-0.99,-4.75 -5.21,-8.33 -10.25,-8.33zm0 4.3c3.41,0 6.17,2.76 6.17,6.17l0 2.16 10.49 0c3.4,0 6.17,2.76 6.17,6.17l0 38.08c0,3.41 -2.77,6.17 -6.17,6.17l-55.83 0c-3.41,0 -6.17,-2.76 -6.17,-6.17l0 -38.08c0,-3.41 2.77,-6.17 6.17,-6.17l10.49 0 0 -2.16c0,-3.41 2.77,-6.17 6.17,-6.17l22.51 0zm0.52 32.31c0,6.51 -5.27,11.78 -11.78,11.78 -6.5,0 -11.78,-5.27 -11.78,-11.78 0,-6.51 5.27,-11.78 11.78,-11.78 6.51,0 11.78,5.27 11.78,11.78zm9.63 0c0,11.82 -9.59,21.41 -21.41,21.41 -11.82,0 -21.41,-9.59 -21.41,-21.41 0,-11.82 9.59,-21.41 21.41,-21.41 11.82,0 21.41,9.58 21.41,21.41zm-3.71 0c0,-9.78 -7.92,-17.7 -17.7,-17.7 -9.77,0 -17.7,7.92 -17.7,17.7 0,9.77 7.92,17.7 17.7,17.7 9.78,0 17.7,-7.92 17.7,-17.7z"
                />
                <Path
                  fill="none"
                  fillRule="nonzero"
                  stroke="#000"
                  strokeWidth="4.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  d="M47.02 8.37c2.09,0 3.78,1.69 3.78,3.78"
                />
                <Path
                  fill="none"
                  fillRule="nonzero"
                  stroke="#000"
                  strokeWidth="4.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  d="M64.14 18.02c1.98,0 3.59,1.61 3.59,3.59"
                />
              </G>
            </Svg>
            <Text
              style={{
                textAlign: 'left',
                fontWeight: '400',
                fontSize: 15,
                marginLeft: 10,
              }}
            >
              Фото (группа файлов)
            </Text>
          </View>
          <FlatList
            horizontal
            data={photos}
            renderItem={renderImages}
            keyExtractor={(item) => item.group_uid}
          />
        </View>
      ) : null}

      {video.length ? (
        <View style={sendMaterialStyles.inputTitleContainer}>
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 15,
              borderBottomWidth: 1,
              marginBottom: 10,
              borderColor: '#000',
              alignItems: 'center',
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              space="preserve"
              width={28}
              height={28}
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
                  fill="#000"
                  fillRule="nonzero"
                  d="M61.92 4.02c3.18,0 5.76,2.58 5.76,5.77l0 43.47c0,3.19 -2.58,5.77 -5.76,5.77l-52.14 0c-3.18,0 -5.76,-2.58 -5.76,-5.77l0 -43.47c0,-3.18 2.58,-5.77 5.76,-5.77l52.14 0zm0 -4.02l-52.14 0c-5.39,0 -9.78,4.39 -9.78,9.78l0 43.47c0,5.4 4.39,9.78 9.78,9.78l52.14 0c5.39,0 9.78,-4.39 9.78,-9.78l0 -43.47c0,-5.39 -4.39,-9.78 -9.78,-9.78zm-44.59 15.05l0 -4.12c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.12 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.12 0c0.56,0 1.04,-0.21 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.12c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.12 0c-0.56,0 -1.04,0.21 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.12 0c0.56,0 1.04,-0.21 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.12c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.12 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.12 0c0.56,0 1.04,-0.2 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.11c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.12 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.11c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.12 0c0.56,0 1.04,-0.2 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm32.93 -24.69l0 -16.47c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-24.7 0c-0.56,0 -1.04,0.2 -1.44,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 16.47c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.44,0.61l24.7 0c0.56,0 1.04,-0.21 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 24.69l0 -16.46c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-24.7 0c-0.56,0 -1.04,0.2 -1.44,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 16.46c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.44,0.61l24.7 0c0.56,0 1.04,-0.2 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm12.35 -37.04l0 -4.12c0,-0.56 -0.21,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.11 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.11 0c0.56,0 1.04,-0.21 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.12c0,-0.56 -0.21,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.11 0c-0.56,0 -1.04,0.21 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.11 0c0.56,0 1.04,-0.21 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.12c0,-0.56 -0.21,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.11 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.11 0c0.56,0 1.04,-0.2 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.11c0,-0.56 -0.21,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.11 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.11c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.11 0c0.56,0 1.04,-0.2 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45z"
                />
              </G>
            </Svg>
            <Text
              style={{
                textAlign: 'left',
                fontWeight: '400',
                fontSize: 15,
                marginLeft: 10,
              }}
            >
              Видео
            </Text>
          </View>
          <FlatList
            horizontal
            data={video}
            renderItem={renderVideo}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      ) : null}
      {videos.length ? (
        <View style={sendMaterialStyles.inputTitleContainer}>
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 15,
              borderBottomWidth: 1,
              marginBottom: 10,
              borderColor: '#000',
              alignItems: 'center',
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              space="preserve"
              width={28}
              height={28}
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
                  fill="#000"
                  fillRule="nonzero"
                  d="M61.92 4.02c3.18,0 5.76,2.58 5.76,5.77l0 43.47c0,3.19 -2.58,5.77 -5.76,5.77l-52.14 0c-3.18,0 -5.76,-2.58 -5.76,-5.77l0 -43.47c0,-3.18 2.58,-5.77 5.76,-5.77l52.14 0zm0 -4.02l-52.14 0c-5.39,0 -9.78,4.39 -9.78,9.78l0 43.47c0,5.4 4.39,9.78 9.78,9.78l52.14 0c5.39,0 9.78,-4.39 9.78,-9.78l0 -43.47c0,-5.39 -4.39,-9.78 -9.78,-9.78zm-44.59 15.05l0 -4.12c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.12 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.12 0c0.56,0 1.04,-0.21 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.12c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.12 0c-0.56,0 -1.04,0.21 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.12 0c0.56,0 1.04,-0.21 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.12c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.12 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.12 0c0.56,0 1.04,-0.2 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.11c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.12 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.11c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.12 0c0.56,0 1.04,-0.2 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm32.93 -24.69l0 -16.47c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-24.7 0c-0.56,0 -1.04,0.2 -1.44,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 16.47c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.44,0.61l24.7 0c0.56,0 1.04,-0.21 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 24.69l0 -16.46c0,-0.56 -0.2,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-24.7 0c-0.56,0 -1.04,0.2 -1.44,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 16.46c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.44,0.61l24.7 0c0.56,0 1.04,-0.2 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm12.35 -37.04l0 -4.12c0,-0.56 -0.21,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.11 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.11 0c0.56,0 1.04,-0.21 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.12c0,-0.56 -0.21,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.11 0c-0.56,0 -1.04,0.21 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.11 0c0.56,0 1.04,-0.21 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.12c0,-0.56 -0.21,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.11 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.12c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.11 0c0.56,0 1.04,-0.2 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45zm0 12.35l0 -4.11c0,-0.56 -0.21,-1.04 -0.61,-1.45 -0.41,-0.41 -0.89,-0.61 -1.45,-0.61l-4.11 0c-0.56,0 -1.04,0.2 -1.45,0.61 -0.41,0.41 -0.61,0.89 -0.61,1.45l0 4.11c0,0.56 0.2,1.04 0.61,1.45 0.41,0.41 0.89,0.61 1.45,0.61l4.11 0c0.56,0 1.04,-0.2 1.45,-0.61 0.41,-0.41 0.61,-0.89 0.61,-1.45z"
                />
              </G>
            </Svg>
            <Text
              style={{
                textAlign: 'left',
                fontWeight: '400',
                fontSize: 15,
                marginLeft: 10,
              }}
            >
              Видео (группа файлов)
            </Text>
          </View>
          <FlatList
            horizontal
            data={videos}
            renderItem={renderVideos}
            keyExtractor={(item) => item.group_uid}
          />
        </View>
      ) : null}

      {document.length ? (
        <View style={sendMaterialStyles.inputTitleContainer}>
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 15,
              borderBottomWidth: 1,
              marginBottom: 10,
              borderColor: '#000',
              alignItems: 'center',
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              space="preserve"
              width={28}
              height={28}
              version="1.1"
              style={{
                shapeRendering: 'geometricPrecision',
                textRendering: 'geometricPrecision',
                imageRendering: 'optimizeQuality',
                fillRule: 'evenodd',
                clipRule: 'evenodd',
              }}
              viewBox="0 0 77.16 61.77"
              xlink="http://www.w3.org/1999/xlink"
              xodm="http://www.corel.com/coreldraw/odm/2003"
            >
              <G id="Слой_x0020_1">
                <Path
                  fill="#000"
                  fillRule="nonzero"
                  d="M14.47 46.32l48.22 0c1.14,0 2.07,0.93 2.07,2.07 0,1.14 -0.94,2.07 -2.07,2.07l-48.22 0c-1.14,0 -2.07,-0.93 -2.07,-2.07 0,-1.14 0.93,-2.07 2.07,-2.07zm0 -7.61l48.22 0c1.14,0 2.07,0.93 2.07,2.07 0,1.14 -0.94,2.07 -2.07,2.07l-48.22 0c-1.14,0 -2.07,-0.93 -2.07,-2.07 0,-1.14 0.93,-2.07 2.07,-2.07zm0 -7.88l48.22 0c1.14,0 2.07,0.93 2.07,2.07 0,1.14 -0.94,2.07 -2.07,2.07l-48.22 0c-1.14,0 -2.07,-0.93 -2.07,-2.07 0,-1.14 0.93,-2.07 2.07,-2.07zm-0.04 -19.09l26.66 0c1.14,0 2.07,0.93 2.07,2.07 0,1.14 -0.94,2.07 -2.07,2.07l-26.66 0c-1.14,0 -2.07,-0.93 -2.07,-2.07 0,-1.14 0.93,-2.07 2.07,-2.07zm-14.44 41.48c0,4.72 3.84,8.56 8.56,8.56l60.04 0c4.72,0 8.56,-3.84 8.56,-8.56l0 -36.34c0,-1.07 -0.43,-2.1 -1.18,-2.86l-4.09 -4.09 -7.19 -7.19 -0.04 -0.04 -1.51 -1.51c-0.76,-0.76 -1.79,-1.18 -2.86,-1.18l-1.27 0 -4.04 0 -5.32 0 -41.09 0c-4.72,0 -8.56,3.84 -8.56,8.56 0,14.98 0,29.83 0,44.66zm66.17 -43.29l5.12 5.12 -4.97 0c-2.47,0 -4.48,-2.01 -4.48,-4.48l0 -4.97 4.33 4.33zm-8.06 -5.88c-0.2,0.48 -0.31,1.01 -0.31,1.55l0 4.97c0,4.7 3.82,8.52 8.52,8.52l4.97 0c0.65,0 1.28,-0.16 1.83,-0.44l0 34.58c0,2.49 -2.02,4.52 -4.52,4.52l-60.04 0c-2.5,0 -4.52,-2.03 -4.52,-4.52l0 -44.66c0,-2.49 2.02,-4.52 4.52,-4.52l49.55 0zm-43.68 15.59l26.66 0c1.14,0 2.07,0.93 2.07,2.07 0,1.14 -0.94,2.07 -2.07,2.07l-26.66 0c-1.14,0 -2.07,-0.93 -2.07,-2.07 0,-1.14 0.93,-2.07 2.07,-2.07z"
                />
              </G>
            </Svg>
            <Text
              style={{
                textAlign: 'left',
                fontWeight: '400',
                fontSize: 15,
                marginLeft: 10,
              }}
            >
              Документ
            </Text>
          </View>
          <FlatList
            horizontal
            data={document}
            renderItem={renderDocument}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      ) : null}
      {documents.length ? (
        <View style={sendMaterialStyles.inputTitleContainer}>
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 15,
              borderBottomWidth: 1,
              marginBottom: 10,
              borderColor: '#000',
              alignItems: 'center',
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              space="preserve"
              width={28}
              height={28}
              version="1.1"
              style={{
                shapeRendering: 'geometricPrecision',
                textRendering: 'geometricPrecision',
                imageRendering: 'optimizeQuality',
                fillRule: 'evenodd',
                clipRule: 'evenodd',
              }}
              viewBox="0 0 77.16 61.77"
              xlink="http://www.w3.org/1999/xlink"
              xodm="http://www.corel.com/coreldraw/odm/2003"
            >
              <G id="Слой_x0020_1">
                <Path
                  fill="#000"
                  fillRule="nonzero"
                  d="M14.47 46.32l48.22 0c1.14,0 2.07,0.93 2.07,2.07 0,1.14 -0.94,2.07 -2.07,2.07l-48.22 0c-1.14,0 -2.07,-0.93 -2.07,-2.07 0,-1.14 0.93,-2.07 2.07,-2.07zm0 -7.61l48.22 0c1.14,0 2.07,0.93 2.07,2.07 0,1.14 -0.94,2.07 -2.07,2.07l-48.22 0c-1.14,0 -2.07,-0.93 -2.07,-2.07 0,-1.14 0.93,-2.07 2.07,-2.07zm0 -7.88l48.22 0c1.14,0 2.07,0.93 2.07,2.07 0,1.14 -0.94,2.07 -2.07,2.07l-48.22 0c-1.14,0 -2.07,-0.93 -2.07,-2.07 0,-1.14 0.93,-2.07 2.07,-2.07zm-0.04 -19.09l26.66 0c1.14,0 2.07,0.93 2.07,2.07 0,1.14 -0.94,2.07 -2.07,2.07l-26.66 0c-1.14,0 -2.07,-0.93 -2.07,-2.07 0,-1.14 0.93,-2.07 2.07,-2.07zm-14.44 41.48c0,4.72 3.84,8.56 8.56,8.56l60.04 0c4.72,0 8.56,-3.84 8.56,-8.56l0 -36.34c0,-1.07 -0.43,-2.1 -1.18,-2.86l-4.09 -4.09 -7.19 -7.19 -0.04 -0.04 -1.51 -1.51c-0.76,-0.76 -1.79,-1.18 -2.86,-1.18l-1.27 0 -4.04 0 -5.32 0 -41.09 0c-4.72,0 -8.56,3.84 -8.56,8.56 0,14.98 0,29.83 0,44.66zm66.17 -43.29l5.12 5.12 -4.97 0c-2.47,0 -4.48,-2.01 -4.48,-4.48l0 -4.97 4.33 4.33zm-8.06 -5.88c-0.2,0.48 -0.31,1.01 -0.31,1.55l0 4.97c0,4.7 3.82,8.52 8.52,8.52l4.97 0c0.65,0 1.28,-0.16 1.83,-0.44l0 34.58c0,2.49 -2.02,4.52 -4.52,4.52l-60.04 0c-2.5,0 -4.52,-2.03 -4.52,-4.52l0 -44.66c0,-2.49 2.02,-4.52 4.52,-4.52l49.55 0zm-43.68 15.59l26.66 0c1.14,0 2.07,0.93 2.07,2.07 0,1.14 -0.94,2.07 -2.07,2.07l-26.66 0c-1.14,0 -2.07,-0.93 -2.07,-2.07 0,-1.14 0.93,-2.07 2.07,-2.07z"
                />
              </G>
            </Svg>
            <Text
              style={{
                textAlign: 'left',
                fontWeight: '400',
                fontSize: 15,
                marginLeft: 10,
              }}
            >
              Документ (группа файлов)
            </Text>
          </View>
          <FlatList
            horizontal
            data={documents}
            renderItem={renderDocument}
            keyExtractor={(item) => item.group_uid}
          />
        </View>
      ) : null}

      {audio.length ? (
        <View style={sendMaterialStyles.inputTitleContainer}>
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 15,
              borderBottomWidth: 1,
              marginBottom: 10,
              borderColor: '#000',
              alignItems: 'center',
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              space="preserve"
              width={28}
              height={28}
              version="1.1"
              style={{
                shapeRendering: 'geometricPrecision',
                textRendering: 'geometricPrecision',
                imageRendering: 'optimizeQuality',
                fillRule: 'evenodd',
                clipRule: 'evenodd',
              }}
              viewBox="0 0 100.82 72.1"
              xlink="http://www.w3.org/1999/xlink"
              xodm="http://www.corel.com/coreldraw/odm/2003"
            >
              <G id="Слой_x0020_1">
                <Path
                  fill="#000"
                  fillRule="nonzero"
                  d="M46.16 0c-0,0 -0,0 -0,0 -1.99,0 -3.97,0.53 -5.72,1.54 -0.31,0.18 -0.59,0.38 -0.86,0.62l-16.22 14.17 -10.98 0c-6.83,0 -12.38,5.55 -12.38,12.38l0 14.68c0,6.83 5.55,12.38 12.38,12.38l10.98 0 16.22 14.17c0.26,0.23 0.55,0.44 0.86,0.61 1.75,1.01 3.73,1.54 5.72,1.54 6.32,0 11.46,-5.14 11.46,-11.46l0 -49.18c0,-6.32 -5.14,-11.46 -11.46,-11.46zm-0 5.42c3.15,0 6.04,2.52 6.04,6.03l0 49.18c0,3.52 -2.89,6.04 -6.04,6.04 -1,0 -2.03,-0.26 -3.01,-0.82l-17.76 -15.51 -13.01 -0c-3.84,0 -6.95,-3.11 -6.95,-6.96l0 -14.68c0,-3.84 3.11,-6.96 6.95,-6.96l13.01 0 17.76 -15.51c0.97,-0.56 2,-0.82 3.01,-0.82z"
                />
                <Path
                  fill="none"
                  fillRule="nonzero"
                  stroke="#000"
                  strokeWidth="4.46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  d="M14.11 29.57l9.39 0m12.56 -6.39l7.16 -6.09"
                />
                <Path
                  fill="none"
                  fillRule="nonzero"
                  stroke="#000"
                  strokeWidth="4.85"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  d="M68.32 27.25c1.73,2.5 2.74,5.5 2.74,8.72 0,3.24 -1.01,6.25 -2.76,8.75m9.41 -28.78c4.41,4.67 7.1,13.23 7.1,20.03 0,6.86 -2.74,15.48 -7.24,20.17m9.27 -48.78c7.12,6.67 11.54,18.33 11.54,28.62 0,10.37 -4.49,22.09 -11.71,28.78"
                />
              </G>
            </Svg>
            <Text
              style={{
                textAlign: 'left',
                fontWeight: '400',
                fontSize: 15,
                marginLeft: 10,
              }}
            >
              Аудио
            </Text>
          </View>
          <FlatList
            horizontal
            data={audio}
            renderItem={renderAudio}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      ) : null}
      {audios.length ? (
        <View style={sendMaterialStyles.inputTitleContainer}>
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 15,
              borderBottomWidth: 1,
              marginBottom: 10,
              borderColor: '#000',
              alignItems: 'center',
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              space="preserve"
              width={28}
              height={28}
              version="1.1"
              style={{
                shapeRendering: 'geometricPrecision',
                textRendering: 'geometricPrecision',
                imageRendering: 'optimizeQuality',
                fillRule: 'evenodd',
                clipRule: 'evenodd',
              }}
              viewBox="0 0 100.82 72.1"
              xlink="http://www.w3.org/1999/xlink"
              xodm="http://www.corel.com/coreldraw/odm/2003"
            >
              <G id="Слой_x0020_1">
                <Path
                  fill="#000"
                  fillRule="nonzero"
                  d="M46.16 0c-0,0 -0,0 -0,0 -1.99,0 -3.97,0.53 -5.72,1.54 -0.31,0.18 -0.59,0.38 -0.86,0.62l-16.22 14.17 -10.98 0c-6.83,0 -12.38,5.55 -12.38,12.38l0 14.68c0,6.83 5.55,12.38 12.38,12.38l10.98 0 16.22 14.17c0.26,0.23 0.55,0.44 0.86,0.61 1.75,1.01 3.73,1.54 5.72,1.54 6.32,0 11.46,-5.14 11.46,-11.46l0 -49.18c0,-6.32 -5.14,-11.46 -11.46,-11.46zm-0 5.42c3.15,0 6.04,2.52 6.04,6.03l0 49.18c0,3.52 -2.89,6.04 -6.04,6.04 -1,0 -2.03,-0.26 -3.01,-0.82l-17.76 -15.51 -13.01 -0c-3.84,0 -6.95,-3.11 -6.95,-6.96l0 -14.68c0,-3.84 3.11,-6.96 6.95,-6.96l13.01 0 17.76 -15.51c0.97,-0.56 2,-0.82 3.01,-0.82z"
                />
                <Path
                  fill="none"
                  fillRule="nonzero"
                  stroke="#000"
                  strokeWidth="4.46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  d="M14.11 29.57l9.39 0m12.56 -6.39l7.16 -6.09"
                />
                <Path
                  fill="none"
                  fillRule="nonzero"
                  stroke="#000"
                  strokeWidth="4.85"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  d="M68.32 27.25c1.73,2.5 2.74,5.5 2.74,8.72 0,3.24 -1.01,6.25 -2.76,8.75m9.41 -28.78c4.41,4.67 7.1,13.23 7.1,20.03 0,6.86 -2.74,15.48 -7.24,20.17m9.27 -48.78c7.12,6.67 11.54,18.33 11.54,28.62 0,10.37 -4.49,22.09 -11.71,28.78"
                />
              </G>
            </Svg>
            <Text
              style={{
                textAlign: 'left',
                fontWeight: '400',
                fontSize: 15,
                marginLeft: 10,
              }}
            >
              Аудио (группа файлов)
            </Text>
          </View>
          <FlatList
            horizontal
            data={audios}
            renderItem={renderAudio}
            keyExtractor={(item) => item.group_uid}
          />

          <DeleteFileModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </View>
      ) : null}
    </ScrollView>
  );
}

export default SendMaterialScreen;
