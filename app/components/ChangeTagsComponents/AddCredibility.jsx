import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import color from '../../misc/color';

function AddCredibility({
  item,
  backgroundColor,
  textColor,
  check,
  handlePress,
}) {
  return (
    <TouchableOpacity
      onPress={() => handlePress(item, check)}
      style={[styles.item, backgroundColor]}
    >
      <Text style={[styles.title, textColor]}>{item.title}</Text>
      <View style={styles.circleContainer}>
        <View
          style={[
            styles.circleInner,
            { backgroundColor: check ? 'green' : 'red' },
          ]}
        ></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9c2ff',
    padding: 15,
    marginVertical: 8,
    marginRight: 8,
    borderRadius: 25,
  },
  title: {
    fontSize: 13,
    marginRight: 10,
    fontFamily: 'GothamMedium',
  },
  circleContainer: {
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: color.APP_BG,
  },
  circleInner: {
    width: 6,
    height: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
});

export default AddCredibility;
