import { View, StyleSheet } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';

const PdfReaderScreen = (props) => {
  const { params } = props.route;

  return (
    <View style={styles.container}>
      <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri: `https://api.taptar.ru/storage/${params.path}` }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
export default PdfReaderScreen;