import { View, StyleSheet, Image, FlatList } from 'react-native';
import React from 'react';
import PdfReader from './PdfReader';
import { Video, AVPlaybackStatus } from 'expo-av';
import AudioPlayer from './AudioPlayer';
import DeleteBtn from './DeleteBtn';

const MediaBoxFiles = ({ item }) => {
  const renderItems = ({ media }) => {
    let mediaItem = null;

    if (item.type === 'photo') {
      mediaItem = (
        <View style={styles.media}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: `http://api.taptar.ru/storage/${media.path}`,
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
              uri: `http://api.taptar.ru/storage/${media.path}`,
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
          <AudioPlayer path={media.path} />
        </View>
      );
    }

    if (item.type === 'document') {
      mediaItem = (
        <View style={styles.mediaDocument}>
          <PdfReader path={media.path} />
        </View>
      );
    }

    return mediaItem;
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={item.files}
        renderItem={renderItems}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 35,
  },
  media: {
    width: 350,
    height: 310,
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 20,
    marginHorizontal: 35,
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

export default MediaBoxFiles;
