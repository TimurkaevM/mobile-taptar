import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Video } from 'expo-av';
import { getVideo } from '../redux/ducks/contributionVideo';

const ContributionVideoScreen = ({ navigation }) => {
  const { navigate } = navigation;

  const dispatch = useDispatch();

  const videos = useSelector((state) => state.contributionVideo.video);
  const loading = useSelector((state) => state.contributionVideo.loading);

  React.useEffect(() => {
    dispatch(getVideo());
  }, [dispatch]);

  const renderItem = ({ item }) => {
    const title = item.title === null ? '' : item.title;

    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => navigate('FileInfoScreen', { id: item.file_id })}
          style={styles.cardMedia}
        >
          <Video
            style={styles.cardItem}
            source={{
              uri: `https://api.taptar.ru/storage/${item.path_to_file}`,
            }}
            useNativeControls={false}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {title}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size={50} color="#4686cc" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
      <FlatList
        horizontal={false}
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.file_id.toString()}
      />
    </View>
  );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: 'center',
  },

  card: {
    width: width - 50,
    marginVertical: 20,
    marginHorizontal: 15,
  },

  cardTitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 25,
    color: '#000',
  },

  cardMedia: {
    overflow: 'hidden',
    width: '100%',
    height: 250,
    borderRadius: 20,
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },

  cardItem: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default React.memo(ContributionVideoScreen);
