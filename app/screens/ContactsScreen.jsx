import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadContacts } from '../redux/ducks/contacts';

function ContactsScreen() {
  const dispatch = useDispatch();

  const contacts = useSelector(
    (state) => state.contacts.contacts,
  );
  const loading = useSelector((state) => state.contacts.loading);

  useEffect(() => {
    dispatch(loadContacts());
  }, [dispatch]);

  const renderContact = ({ item }) => {
    const title = item.title === null ? '' : item.title;

    const types = item?.info?.types;

    return (
      <TouchableOpacity
        onPress={() => navigate('ChatScreen', { id: item.id })}
        style={styles.contact}
      >
       <Text>{item.title}</Text>
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
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
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
});

export default ContactsScreen;
