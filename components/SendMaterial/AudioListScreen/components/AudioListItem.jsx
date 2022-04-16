import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import color from '../../../misc/color';

export default function AudioListItem() {
  return (
    <>
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View styles={styles.thumbnail}>
          <Text styles={styles.thumbnailText}>A</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>This will be some long text!!!</Text>
          <Text style={styles.timeText}>03:59</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Entypo name="dots-three-vertical" size={24} color={color.FONT_MEDIUM} />
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
    fontSize: 22,
    fontWeight: 'bold',
    color: color.FONT,
  },
  titleContainer: {
    width: width - 180,
    paddingLeft: 10,
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