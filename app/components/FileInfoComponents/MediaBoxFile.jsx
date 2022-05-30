import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import PdfReader from './PdfReader';
import { Video, AVPlaybackStatus } from 'expo-av';
import AudioPlayer from './AudioPlayer';
import { useSelector } from 'react-redux';

const MediaBoxFile = () => {
  const file = useSelector((state) => state.showFileCabinet.file);

  console.log(file);

  let mediaItem = null;

  if (file.type === 'photo') {
    mediaItem = (
      <View style={styles.media}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `http://api.taptar.ru/storage/${file.path_to_file}`,
          }}
        />
      </View>
    );
  }

  if (file.type === 'video') {
    mediaItem = (
      <View style={styles.media}>
        <Video
          style={styles.tinyLogo}
          source={{
            uri: `http://api.taptar.ru/storage/${file.path_to_file}`,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          // onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>
    );
  }

  if (file.type === 'audio') {
    mediaItem = (
      <View style={styles.media}>
        <AudioPlayer path={file.path_to_file} />
      </View>
    );
  }

  if (file.type === 'document') {
    mediaItem = (
      <View style={styles.mediaDocument}>
        <PdfReader path={file.path_to_file} />
      </View>
    );
  }

  return <View style={styles.container}>{mediaItem}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 35,
  },
  media: {
    width: 350,
    height: 310,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },

  mediaDocument: {
    height: 200,
    width: 200,
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },

  tinyLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default MediaBoxFile;
