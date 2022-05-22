import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import PdfReader from './PdfReader';
import { Video, AVPlaybackStatus } from 'expo-av';
import AudioPlayer from './AudioPlayer';

const MediaBoxFile = ({ item }) => {
  let mediaItem = null;

  if (item.type === 'photo') {
    mediaItem = (
      <View style={styles.media}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `http://api.taptar.ru/storage/${item.path}`,
          }}
        />
      </View>
    );
  }

  if (item.type === 'video') {
    mediaItem = (
      <View style={styles.media}>
        <Video
          style={styles.tinyLogo}
          source={{
            uri: `http://api.taptar.ru/storage/${item.path}`,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          // onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>
    );
  }

  if (item.type === 'audio') {
    mediaItem = (
      <View style={styles.media}>
        <AudioPlayer path={item.path} />
      </View>
    );
  }

  if (item.type === 'document') {
    mediaItem = (
      <View style={styles.mediaDocument}>
        <PdfReader path={item.path} />
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
