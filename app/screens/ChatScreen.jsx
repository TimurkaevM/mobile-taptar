import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadMessages,
  savedIncomingMassage,
  savedMassage,
} from '../redux/ducks/messages';
import DeleteMessageModal from '../components/ChatComponents/DeleteMessageModal';
import MessageText from '../components/ChatComponents/MessageText';
import MessageFile from '../components/ChatComponents/MessageFile';
import MessageSend from '../components/ChatComponents/MessageSend';
import Echo from 'laravel-echo';
import socketio from 'socket.io-client';
import ChatModal from '../components/ChatComponents/ChatModal';
import ChatHeader from '../components/ChatComponents/ChatHeader';
import StatusBarPlaceHolder from '../misc/StatusBarPlaceHolder';

function ChatScreen({ route, navigation }) {
  const { params } = route;
  const { goBack, navigate } = navigation;

  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);

  const currentUserId = useSelector((state) => state.user.currentUser.id);

  const messages = useSelector((state) => state.messages.messages);
  const loading = useSelector((state) => state.messages.loading);

  const [flatList, setFlatList] = useState(null);

  const lastItemIndex = messages.length - 1;

  let echo = new Echo({
    broadcaster: 'socket.io',
    host: 'https://api.taptar.ru',
    client: socketio,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    if (params.id !== undefined) {
      dispatch(loadMessages(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    echo.private(`room.${params.id}`).listen('.message.send', function (e) {
      if (flatList != null) {
        flatList.scrollToIndex({ animate: true, index: 0 });
      }
      if (e.data.user_id !== currentUserId) {
        return dispatch(savedIncomingMassage(e));
      }
      return dispatch(savedMassage(e));
    });

    return () => {
      echo.leave(`room.${params.id}`);
    };
  }, [dispatch, params.id]);

  const renderMessages = ({ item, index }) => {
    const { user_id, type } = item;
    const isUserProfile = currentUserId === user_id;

    return type === 'text' ? (
      <MessageText
        roomId={params.id}
        index={index}
        item={item}
        isUserProfile={isUserProfile}
        lastItemIndex={lastItemIndex}
      />
    ) : (
      <MessageFile
        roomId={params.id}
        index={index}
        item={item}
        isUserProfile={isUserProfile}
        lastItemIndex={lastItemIndex}
      />
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBarPlaceHolder />
      <ChatHeader goBack={goBack} />
      <View
        style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column' }}
      >
        <FlatList
          inverted={-1}
          data={messages}
          extraData={messages}
          renderItem={renderMessages}
          keyExtractor={(item) => item.id.toString()}
          ref={setFlatList}
        />
      </View>
      <MessageSend contactId={params.id} />
      <DeleteMessageModal />
      <ChatModal navigate={navigate} />
    </KeyboardAvoidingView>
  );
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
});

export default ChatScreen;
