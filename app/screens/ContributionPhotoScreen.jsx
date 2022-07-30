import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPhoto, getPhotoHistorian } from '../redux/ducks/contributionPhoto';
import color from '../misc/color';

const ContributionPhotoScreen = ({ navigation }) => {
  const { navigate } = navigation;

  const dispatch = useDispatch();

  const photos = useSelector((state) => state.contributionPhoto.photo);
  const loading = useSelector((state) => state.contributionPhoto.loading);
  const currentUser = useSelector((state) => state.user.currentUser);

  const { role } = currentUser;

  React.useEffect(() => {
    if (role === 'user') {
      dispatch(getPhoto());
    } else {
      dispatch(getPhotoHistorian());
    }
  }, [dispatch]);

  const renderImage = ({ item }) => {
    const title = item.title === null ? '' : item.title;

    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            navigate('FileInfoScreen', {
              id: role === 'user' ? item.file_id : item.id,
            })
          }
          style={styles.cardMedia}
        >
          <Image
            style={styles.cardItem}
            source={{
              uri: `https://api.taptar.ru/storage/${item.path_to_file}`,
            }}
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

  if (!photos.length) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ fontFamily: 'GothamMedium' }}>Список файлов пуст</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
      <FlatList
        data={photos}
        horizontal={false}
        numColumns={3}
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
    width: 100,
    marginVertical: 20,
    marginHorizontal: 15,
  },

  cardTitle: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '500',
    marginTop: 25,
    color: '#000',
    fontFamily: 'GothamMedium',
  },

  cardMedia: {
    overflow: 'hidden',
    width: '100%',
    height: 100,
    borderRadius: 20,
    shadowColor: '#000',
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: color.FONT_LIGHT,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  cardItem: {
    // borderRadius: 20,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default React.memo(ContributionPhotoScreen);
