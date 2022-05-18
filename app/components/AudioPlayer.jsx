import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import color from '../misc/color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import PlayerButton from '../misc/PlayerButton';
import { pause, play, resume } from '../misc/audioController';
import { convertTime } from '../misc/convertTime';

const { width } = Dimensions.get('window');

export default function AudioPlayer({ path }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [playbackObject, setPlaybackObject] = React.useState(null);
  const [playbackStatus, setPlaybackStatus] = React.useState(null);
  const [playbackPosition, setPlaybackPosition] = React.useState(null);
  const [playbackDuration, setPlaybackDuration] = React.useState(null);
  const [currentPosition, setCurrentPosition] = React.useState(0);

  React.useEffect(() => {
    if (playbackObject === null) {
      setPlaybackObject(new Audio.Sound());
    }
  }, []);

  const onPlaybackStatusUpdate = async (status) => {
    console.log(status, 'status');
    if (status.isLoaded && status.isPlaying) {
      setPlaybackDuration(status.durationMillis);
      setPlaybackPosition(status.positionMillis);
    } else {
      if (status.isLoaded === false && status.error) {
        const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
        console.log(errorMsg, 'error');
      }
    }
  };

  const calculateSeebBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }

    return 0;
  };

  const handlePlayPause = async () => {
    // play
    if (playbackObject !== null && playbackStatus === null) {
      const uri = 'https://api.taptar.ru/storage/' + path;
      const status = await play(playbackObject, uri);
      playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }
    // pause
    if (playbackStatus && playbackStatus.isPlaying) {
      const status = await pause(playbackObject);
      setIsPlaying(false);
      return setPlaybackStatus(status);
    }
    // resume
    if (playbackStatus && !playbackStatus.isPlaying) {
      const status = await resume(playbackObject);
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }
  };

  const moveAudio = async (value) => {
    if (playbackStatus === null || !isPlaying) return;

    try {
      const status = await playbackObject.setPositionAsync(
        Math.floor(playbackStatus.durationMillis * value),
      );
      setPlaybackStatus(status);
      setPlaybackPosition(status.positionMillis);

      await resume(playbackObject);
    } catch (error) {
      console.log('error inside onSlidingComplete callback', error);
    }
  };

  const renderCurrentTime = () => {
    return convertTime(playbackPosition / 1000);
  };

  React.useEffect(() => {
    return playbackObject
      ? () => {
          console.log('Unloading Sound');
          playbackObject.unloadAsync();
        }
      : undefined;
  }, [playbackObject, path]);

  return (
    <View style={styles.container}>
      <View style={styles.midBannerContainer}>
        <MaterialCommunityIcons
          name="music-circle"
          size={150}
          color={isPlaying ? color.ACTIVE_BG : color.FONT_MEDIUM}
        />
      </View>
      <View style={styles.audioPlayerContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}
        >
          <Text>{convertTime(playbackDuration / 1000)}</Text>
          <Text>{currentPosition ? currentPosition : renderCurrentTime()}</Text>
        </View>
        <Slider
          style={{ width: width - 100, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          value={calculateSeebBar()}
          minimumTrackTintColor={color.FONT_MEDIUM}
          maximumTrackTintColor={color.ACTIVE_BG}
          onValueChange={(value) => {
            setCurrentPosition(convertTime(value * (playbackDuration / 1000)));
          }}
          onSlidingStart={async () => {
            if (!isPlaying) return;

            try {
              await pause(playbackObject);
            } catch (error) {
              console.log('error inside onSlidingStart callback', error);
            }
          }}
          onSlidingComplete={async (value) => {
            await moveAudio(value);
            setCurrentPosition(0);
          }}
        />
        <View style={styles.audioControllers}>
          <PlayerButton
            onPress={handlePlayPause}
            style={{ marginHorizontal: 25 }}
            iconType={isPlaying ? 'PLAY' : 'PAUSE'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  audioControllers: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  audioCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
  },
  audioCount: {
    textAlign: 'right',
    color: color.FONT_LIGHT,
    fontSize: 14,
  },
  midBannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioTitle: {
    fontSize: 16,
    color: color.FONT,
    padding: 15,
  },
});
