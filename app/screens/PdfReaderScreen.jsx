import { View, StyleSheet } from 'react-native';
import React from 'react';

const PdfReaderScreen = (props) => {
  const { params } = props.route;

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default PdfReaderScreen;
