import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import {
  LayoutProvider,
  RecyclerListView,
  DataProvider,
} from 'recyclerlistview';
import AudioListItem from '../components/AudioListItem';

const AudioListScreen = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [permissionError, setPermissionError] = useState(false);

  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2),
  );

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      getAudioFiles();
    }

    if (!permission.canAskAgain && !permission.granted) {
      setPermissionError(true);
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      if (status === 'denied' && canAskAgain) {
        permissionAlert();
      }

      if (status === 'granted') {
        getAudioFiles();
      }

      if (status === 'denied' && !canAskAgain) {
        setPermissionError(true);
      }
    }
  };

  const permissionAlert = () => {
    Alert.alert('Permission Required', 'This app needs to read audio files', [
      {
        text: 'I am ready',
        onPress: () => getPermission(),
      },
      {
        text: 'cancel',
        onPress: () => permissionAlert(),
      },
    ]);
  };

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    });
    setAudioFiles([...audioFiles, ...media.assets]);
    setDataProvider(
      dataProvider.cloneWithRows([...audioFiles, ...media.assets]),
    );
  };

  const layoutProvider = new LayoutProvider(
    (i) => 'audio',
    (type, dim) => {
      switch (type) {
        case 'audio':
          dim.width = Dimensions.get('window').width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );

  const rowRender = (type, item) => {
    return (
      <AudioListItem 
        title={item.filename}
        duration={item.duration}
      />
    );
  };

  useEffect(() => {
    getPermission();
  }, []);

  if (permissionError) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 25, textAlign: 'center', color: 'red' }}>
          It looks like you haven't accept the permission.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {dataProvider && dataProvider.getSize() > 0 && (
        <RecyclerListView
          dataProvider={dataProvider}
          layoutProvider={layoutProvider}
          rowRenderer={rowRender}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AudioListScreen;
