import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import color from '../misc/color';
import { Entypo } from '@expo/vector-icons';

const convertTime = minutes => {
  if (minutes) {
    const hrs = minutes / 60;
    const minute = hrs.toString().split('.')[0];
    const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
    const sec = Math.ceil((60 * percent) / 100);

    if (parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`;
    }

    if (parseInt(minute) < 10) {
      return `0${minute}:${sec}`;
    }

    if (sec < 10) {
      return `${minute}:0${sec}`;
    }

    return `${minute}:${sec}`;
  }
};

const renderPlayPauseIcon = isPlaying => {
  if (isPlaying)
    return (
      <Entypo name='controller-paus' size={24} color={color.ACTIVE_FONT} />
    );
  return <Entypo name='controller-play' size={24} color={color.ACTIVE_FONT} />;
};

export default function AudioListItem({title, duration, onAudioPress, isPlaying, activeListItem}){
  return (
    <>
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableWithoutFeedback onPress={onAudioPress}>
          <View style={styles.thumbnail}>
            {activeListItem
              ? renderPlayPauseIcon(isPlaying)
              : <Entypo name='controller-play' size={24} color={color.ACTIVE_FONT} />}
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
          <Text style={styles.timeText}>{convertTime(duration)}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        {/* <AntDesign name="check" size={24} color="green" /> */}
        <AntDesign name="close" size={24} color="red" />
      </View>
    </View>
    <View style={styles.separator} />
    </>
  )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: width - 80,
    marginTop: 15,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightContainer: {
    flexBasis: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    height: 50,
    flexBasis: 50,
    backgroundColor: color.FONT_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  thumbnailText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.APP_BG,
  },
  titleContainer: {
    width: width - 180,
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    color: color.FONT,
  },
  separator: {
    width: width - 80,
    backgroundColor: '#333',
    opacity: 0.3,
    height: 0.5,
    alignSelf: 'center',
    marginTop: 10,
  },
  timeText: {
    fontSize: 14,
    color: color.FONT_LIGHT,
  },
})