import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CredibilityIcons from '../../SvgIcons/CredibilityIcons/CredibilityIcons';

function CredibilityItem({ item }) {
  return (
    <View style={styles.item}>
      <CredibilityIcons title={item.title} size={30} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 8,
    marginRight: 20,
    borderRadius: 25,
  },
  title: {
    fontSize: 12,
    marginTop: 10,
    fontFamily: 'GothamMedium',
  },
});

export default CredibilityItem;
