import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPhoto } from '../redux/ducks/contribution';

const ContributionPhotoScreen = () => {
  const dispatch = useDispatch();

  const photos = useSelector((state) => state.contribution.photo);
  const loading = useSelector((state) => state.contribution.loading);

  React.useEffect(() => {
    dispatch(getPhoto());
  }, [dispatch]);

  const renderImage = ({ item }) => {
    const title = item.title === null ? '' : item.title;

    return (
      <View style={styles.card}>
        <View style={styles.cardMedia}>
          <Image
            style={styles.cardItem}
            source={{
              uri: `https://api.taptar.ru/storage/${item.path_to_file}`,
            }}
          />
        </View>
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
        data={photos}
        renderItem={renderImage}
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

export default ContributionPhotoScreen;
