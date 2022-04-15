import { Text, View, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library'

const AudioListScreen = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [permissionError, setPermissionError] = useState(false);

  console.log(audioFiles)

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if(permission.granted){
      getAudioFiles();
    }

    if(!permission.canAskAgain && !permission.granted) {
      setPermissionError(true);
    }

    if(!permission.granted && permission.canAskAgain) {
      const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();

      if(status === 'denied' && canAskAgain) {
        permissionAlert()
      }

      if(status === 'granted') {
        getAudioFiles();
      }

      if(status === 'denied' && !canAskAgain) {
        setPermissionError(true);
      }
    }
  }

  const permissionAlert = () => {
    Alert.alert('Permission Required', 'This app needs to read audio files', [{
      text: 'I am ready',
      onPress: () => getPermission(),
    }, {
      text: 'cancel',
      onPress: () => permissionAlert(),
    }])
  }

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
    })
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    })

    setAudioFiles(media.assets);
  } 

  useEffect(() => {
    getPermission();
  }, []);

  if(permissionError) {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 25, textAlign: 'center', color: 'red'}}>
          It looks like you haven't accept the permission.
        </Text>
      </View>
    )
  }

  return (
    <ScrollView>
      {audioFiles.map(item => <Text key={item.id}>{item.filename}</Text>)}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default AudioListScreen;