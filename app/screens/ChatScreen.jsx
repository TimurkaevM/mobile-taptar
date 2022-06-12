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
import { loadMessages } from '../redux/ducks/messages';
import moment from 'moment';
import 'moment/locale/ru';
import color from '../misc/color';

function ChatScreen({ route }) {
  const { params } = route;

  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);

  const currentUserId = useSelector((state) => state.user.currentUser.id);

  const messages = useSelector((state) => state.messages.messages);
  const loading = useSelector((state) => state.messages.loading);

  useEffect(() => {
    if (params.id !== undefined) {
      dispatch(loadMessages(params.id));
    }
  }, [dispatch, params.id]);

  const renderMessages = ({ item, index }) => {
    const { message, user_id, created_at, type } = item;
    const isUserProfile = currentUserId === user_id;

    return (
      <View
        style={[
          isUserProfile ? styles.messageOutGoing : styles.messageInComing,
          { marginTop: index === 0 ? 10 : 0 },
        ]}
      >
        <View
          style={
            isUserProfile ? styles.messageContentOut : styles.messageContentIn
          }
        >
          <Text style={styles.messageText} numberOfLines={1}>
            {message}
          </Text>
        </View>
        <Text
          style={[
            styles.messageDate,
            { textAlign: isUserProfile ? 'right' : 'left' },
          ]}
          numberOfLines={1}
        >
          {moment(created_at).locale('ru').format('LT')}
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
    <>
      <View style={{ flex: 5.2, backgroundColor: '#fafafa' }}>
        <FlatList
          data={messages}
          renderItem={renderMessages}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={{ flex: 0.8, backgroundColor: '#fff' }}></View>
    </>
  );
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: 'center',
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
  messageOutGoing: {
    alignSelf: 'flex-end',
    maxWidth: width - 90,
    marginBottom: 18,
    marginRight: 10,
  },
  messageInComing: {
    alignSelf: 'flex-start',
    maxWidth: width - 90,
    marginBottom: 18,
    marginLeft: 10,
  },
  messageContentOut: {
    backgroundColor: color.FONT_LIGHT,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 5,
  },
  messageContentIn: {
    backgroundColor: color.MAIN_COLOR,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 5,
  },
  messageText: {
    color: color.APP_BG,
  },
  messageDate: {
    color: '#616161',
    fontSize: 12,
  },
});

export default ChatScreen;
