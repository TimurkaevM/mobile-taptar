import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function AudioPlayer({path}) {
  const [sound, setSound] = React.useState();
  const [isPlaying, setIsPlaying] = React.useState(false);

  async function playSound() {
    setIsPlaying(true);
    console.log('play')
    await sound.playAsync(); 
  }

  async function stopSound() {
    console.log('пауза')
    setIsPlaying(false);
    await sound.pauseAsync();
  }

  React.useEffect(() => {
    async function getSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          {uri: 'https://api.taptar.ru/storage/' + path,}
       );
       setSound(sound)
      } catch (e) {
        console.log(e)
      }
    };
    getSound();
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [path]);

  return (
    // <View style={styles.container}>
      <Button title="Play Sound" onPress={isPlaying ? stopSound : playSound} />
    /* </View> */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});