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
import DocumentItemIcon from '../SvgIcons/SendMaterialIcons/DocumentItemIcon';
import {
  getDocument,
  getDocumentHistorian,
} from '../redux/ducks/contributionDocument';

const ContributionDocumentScreen = ({ navigation }) => {
  const { navigate } = navigation;

  const dispatch = useDispatch();

  const documents = useSelector((state) => state.contributionDocument.document);
  const loading = useSelector((state) => state.contributionDocument.loading);
  const currentUser = useSelector((state) => state.user.currentUser);

  const { role } = currentUser;

  React.useEffect(() => {
    if (role === 'user') {
      dispatch(getDocument());
    } else {
      dispatch(getDocumentHistorian());
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
          <DocumentItemIcon width={170} height={170} color="#4686CC" />
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
        data={documents}
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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

export default React.memo(ContributionDocumentScreen);
