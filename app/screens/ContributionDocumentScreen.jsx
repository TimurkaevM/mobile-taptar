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
          <DocumentItemIcon width={50} height={50} color="#4686CC" />
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

  if (!documents.length) {
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
        data={documents}
        renderItem={renderItem}
        keyExtractor={(item) => item.file_id.toString()}
      />
    </View>
  );
};

const width = Dimensions.get('window').width;

const cardDimensions = {
  cardWidth: 100,
  cardHeight: 100,
  cardTitleSize: 10,
};

function getCardDimensions() {
  if (width <= 450) return cardDimensions;
  if (width > 450 && width <= 700) {
    cardDimensions.cardHeight = 130;
    cardDimensions.cardWidth = 130;
    cardDimensions.cardTitleSize = 12;
    return cardDimensions;
  }
  if (width > 700) {
    cardDimensions.cardHeight = 180;
    cardDimensions.cardWidth = 180;
    cardDimensions.cardTitleSize = 14;
    return cardDimensions;
  }
}

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: 'center',
  },

  card: {
    width: getCardDimensions().cardWidth,
    marginVertical: 20,
    marginHorizontal: 15,
  },

  cardTitle: {
    textAlign: 'center',
    fontSize: getCardDimensions().cardTitleSize,
    fontWeight: '500',
    marginTop: 25,
    color: '#000',
    fontFamily: 'GothamMedium',
  },

  cardMedia: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: getCardDimensions().cardHeight,
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
