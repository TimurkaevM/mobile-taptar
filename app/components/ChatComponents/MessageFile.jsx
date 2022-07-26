import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import DeleteBtn from './DeleteBtn';
import color from '../../misc/color';
import AudioPlayer from '../AddTagsComponents/AudioPlayer';
import PdfReader from '../AddTagsComponents/PdfReader';
import { Video } from 'expo-av';

const MessageFile = ({ item, isUserProfile, index, roomId, lastItemIndex }) => {
  const { message, created_at, type, id } = item;

  let mediaItem = null;

  if (type === 'photo') {
    mediaItem = (
      <View style={styles.media}>
        <Image
          style={styles.mediaImage}
          source={{
            uri: `http://api.taptar.ru/storage/${message}`,
          }}
        />
      </View>
    );
  }

  if (type === 'video') {
    mediaItem = (
      <View style={styles.mediaVideo}>
        <Video
          style={styles.mediaImage}
          source={{
            uri: `http://api.taptar.ru/storage/${message}`,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      </View>
    );
  }

  if (type === 'audio') {
    mediaItem = (
      <View style={styles.media}>
        <AudioPlayer path={message} />
      </View>
    );
  }

  if (type === 'document') {
    mediaItem = (
      <View style={styles.mediaDocument}>
        <PdfReader path={message} />
      </View>
    );
  }

  return (
    <View
      style={[
        isUserProfile ? styles.messageOutGoing : styles.messageInComing,
        { marginTop: index === lastItemIndex ? 20 : 0 },
      ]}
      // onLayout={object => setItemHeights([...itemHeights, object.nativeEvent.layout.height])}
    >
      <View
        style={
          isUserProfile ? styles.messageContentOut : styles.messageContentIn
        }
      >
        {isUserProfile ? <DeleteBtn id={id} roomId={roomId} /> : null}
        {mediaItem}
      </View>
      <Text
        style={[
          styles.messageDate,
          { textAlign: isUserProfile ? 'right' : 'left' },
        ]}
        numberOfLines={1}
      >
        {moment(created_at).locale('ru').format('LT')}
      </Text>
    </View>
  );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: 'center',
  },
  messageOutGoing: {
    alignSelf: 'flex-end',
    marginBottom: 18,
    marginRight: 10,
  },
  messageInComing: {
    alignSelf: 'flex-start',
    marginBottom: 18,
    marginLeft: 10,
  },
  messageContentOut: {
    backgroundColor: color.APP_BG,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1.5,
  },
  messageContentIn: {
    backgroundColor: color.APP_BG,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1.5,
  },
  media: {
    width: 280,
    height: 300,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bed1e6',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  mediaVideo: {
    width: 280,
    height: 300,
    borderWidth: 1,
    shadowColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bed1e6',
  },
  messageDate: {
    color: '#616161',
    fontSize: 12,
    fontFamily: 'GothamLight',
  },
});

export default React.memo(MessageFile);
