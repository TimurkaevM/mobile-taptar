import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function AddInformation({ item, backgroundColor, textColor }) {
  return (
    <View style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#f9c2ff',
    padding: 15,
    marginVertical: 8,
    marginRight: 8,
    borderRadius: 25,
  },
  title: {
    fontSize: 13,
  },
});

export default AddInformation;
