import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StatusBarPlaceHolder from '../misc/StatusBarPlaceHolder';
import { loadContacts } from '../redux/ducks/contacts';
import AvatarIcon from '../SvgIcons/AvatarIcon/AvatarIcon';

function ContactsScreen({ navigation }) {
  const { navigate } = navigation;

  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts.contacts);
  const loading = useSelector((state) => state.contacts.loading);

  useEffect(() => {
    dispatch(loadContacts());
  }, [dispatch]);

  const renderContact = ({ item }) => {
    const { avatar, title, count_new_messages } = item;
    return (
      <TouchableOpacity
        onPress={() => navigate('ChatScreen', { id: item.id })}
        style={styles.contact}
      >
        <View style={styles.contactInfo}>
          <View style={styles.avatarContainer}>
            {avatar ? (
              <Image
                style={styles.avatar}
                source={{
                  uri: `https://api.taptar.ru/storage/avatars/${avatar}`,
                }}
              />
            ) : (
              <AvatarIcon color="#fff" />
            )}
          </View>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        {count_new_messages ? (
          <Text style={styles.count}>+{count_new_messages}</Text>
        ) : null}
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

  return (
    <View style={{ flex: 1, backgroundColor: '#fafafa', alignItems: 'center' }}>
      <StatusBarPlaceHolder />
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: 'center',
  },

  contact: {
    width: width,
    marginBottom: 2,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 200,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#BED1E6',
    borderRadius: 70,
    padding: 2,
    marginRight: 15,
  },
  avatar: {
    borderRadius: 70,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {},
  count: {},
});

export default ContactsScreen;
