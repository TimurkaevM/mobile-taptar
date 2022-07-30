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
import AudioTopItemIcon from '../SvgIcons/SendMaterialIcons/AudioTopItemIcon';
import AudioBottomItemIcon from '../SvgIcons/SendMaterialIcons/AudioBottomItemIcon';
import { getAudio, getAudioHistorian } from '../redux/ducks/contributionAudio';

const ContributionAudioScreen = ({ navigation }) => {
  const { navigate } = navigation;

  const dispatch = useDispatch();

  const audios = useSelector((state) => state.contributionAudio.audio);
  const loading = useSelector((state) => state.contributionAudio.loading);
  const currentUser = useSelector((state) => state.user.currentUser);

  const { role } = currentUser;

  React.useEffect(() => {
    if (role === 'user') {
      dispatch(getAudio());
    } else {
      dispatch(getAudioHistorian());
    }
  }, [dispatch]);

  const renderItem = ({ item }) => {
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
          <AudioTopItemIcon width={50} height={30} color="#4686CC" />
          <AudioBottomItemIcon width={50} height={30} color="#4686CC" />
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

  if (!audios.length) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ fontFamily: 'GothamMedium' }}>Список файлов пуст</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
      <FlatList
        horizontal={false}
        numColumns={3}
        data={audios}
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
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

export default React.memo(ContributionAudioScreen);
