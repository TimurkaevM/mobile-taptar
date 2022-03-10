import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function AddInformation({
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 15,
    marginVertical: 8,
    marginRight: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 13,
  },
});

export default AddInformation;
