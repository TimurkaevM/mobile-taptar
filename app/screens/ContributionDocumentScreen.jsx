import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDocument } from '../redux/ducks/contribution';
import DocumentItemIcon from '../SvgIcons/SendMaterialIcons/DocumentItemIcon';

const ContributionDocumentScreen = () => {
  const dispatch = useDispatch();

  const documents = useSelector((state) => state.contribution.document);
  const loading = useSelector((state) => state.contribution.loading);

  React.useEffect(() => {
    dispatch(getDocument());
  }, [dispatch]);

  const renderItem = ({ item }) => {
    const title = item.title === null ? '' : item.title;

    return (
      <View style={styles.card}>
        <View style={styles.cardMedia}>
          <DocumentItemIcon width={170} height={170} color="#4686CC" />
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
    overflow: 'hidden',
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

export default ContributionDocumentScreen;
