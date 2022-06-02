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
import { getReadyMaterial } from '../redux/ducks/contributionMaterial';
import moment from 'moment';
import MaterialIcon from '../SvgIcons/ContributionIcons/MaterialIcon';
import PhotoIcon from '../SvgIcons/ContributionIcons/PhotoIcon';
import VideoIcon from '../SvgIcons/ContributionIcons/VideoIcon';
import DocumentIcon from '../SvgIcons/ContributionIcons/DocumentIcon';
import AudioIcon from '../SvgIcons/ContributionIcons/AudioIcon';

const ContributionMaterialScreen = ({ navigation }) => {
  const materials = useSelector((state) => state.contributionMaterial.readyMaterial);
  const loading = useSelector((state) => state.contributionMaterial.loading);
  const error = useSelector((state) => state.contributionMaterial.error);

  const { navigate } = navigation;

  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(getReadyMaterial());
  // }, [dispatch]);

  const renderMaterial = ({ item }) => {
    const title = item.title === null ? '' : item.title;

    const types = item?.info?.types;

    return (
      <TouchableOpacity
        onPress={() => navigate('MaterialInfoScreen', { id: item.id })}
        style={styles.card}
      >
        <Text style={styles.cardTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.cardData} numberOfLines={1}>
          {moment(item.created_at).locale('ru').format('DD.MM.YYYY')}
        </Text>
        <View style={styles.cardInfo}>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <PhotoIcon size={20} color="#7d7d7d" />
              <Text style={styles.infoText}>Фото - {types.photo}</Text>
            </View>
            <View style={styles.infoItem}>
              <VideoIcon size={20} color="#7d7d7d" />
              <Text style={styles.infoText}>Видео - {types.video}</Text>
            </View>
            <View style={styles.infoItem}>
              <AudioIcon size={20} color="#7d7d7d" />
              <Text style={styles.infoText}>Аудио - {types.audio}</Text>
            </View>
            <View style={styles.infoItem}>
              <DocumentIcon size={20} color="#7d7d7d" />
              <Text style={styles.infoText}>Документы - {types.document}</Text>
            </View>
          </View>
          <View style={styles.cardIcon}>
            <MaterialIcon size={125} color="#bed1e6" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size={50} color="#4686cc" />
      </View>
    );
  }

  if(error) {
    return <Text>`${error}`</Text>
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
      <FlatList
        data={materials}
        renderItem={renderMaterial}
        keyExtractor={(item) => item.id.toString()}
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
    width: width - 30,
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#dfeaf9',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 5,
    color: '#7d7d7d',
  },
  cardData: {
    fontSize: 12,
    marginBottom: 50,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
  },
  infoText: {
    fontSize: 13,
    color: '#7d7d7d',
    marginLeft: 10,
    marginBottom: 5,
  },
  cardIcon: {
    marginRight: 20,
  },
});

export default ContributionMaterialScreen;
