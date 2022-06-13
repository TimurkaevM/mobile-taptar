import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
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
// import Echo from 'laravel-echo';
// import socketio from 'socket.io-client';
// import Socketio from 'socket.io-client';
import Echo from 'laravel-echo/dist/echo';
import Socketio from 'socket.io-client/dist/socket.io';

function ChatScreen({ route }) {
  const { params } = route;

  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);

  const currentUserId = useSelector((state) => state.user.currentUser.id);

  const messages = useSelector((state) => state.messages.messages);
  const loading = useSelector((state) => state.messages.loading);

  let echo = new Echo({
    broadcaster: 'socket.io',
    host: 'https://api.taptar.ru',
    client: Socketio,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  // echo.private(`room.${params.id}`).listen('.message.send', function (e) {
  //   // Функция которая сработает, когда другой пользователь отправить нам чат, все данные в аргументе "e" будут
  //   if (e.data.user_id !== currentUserId)
  //     return dispatch(savedIncomingMassage(e));
  //   console.log(e);
  //   return dispatch(savedMassage(e));
  // });

  useEffect(() => {
    if (params.id !== undefined) {
      dispatch(loadMessages(params.id));

      // echo.private(`room.${params.id}`).listen('.message.send', function (e) {
      //   // Функция которая сработает, когда другой пользователь отправить нам чат, все данные в аргументе "e" будут
      //   if (e.data.user_id !== currentUserId)
      //     return dispatch(savedIncomingMassage(e));
      //   console.log(e);
      //   return dispatch(savedMassage(e));
      // });
    }
    // return () => {
    //   echo.leave(`room.${params.id}`);
    // };
  }, [dispatch, params.id]);

  useEffect(() => {
    // sessionStorage.setItem('test', params.id);
    echo.private(`room.${params.id}`).listen('.message.send', function (e) {
      // Функция которая сработает, когда другой пользователь отправить нам чат, все данные в аргументе "e" будут
      if (e.data.user_id !== currentUserId)
        return dispatch(savedIncomingMassage(e));
      console.log(e);
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
      />
    ) : (
      <MessageFile
        roomId={params.id}
        index={index}
        item={item}
        isUserProfile={isUserProfile}
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
    <>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <FlatList
          data={messages}
          renderItem={renderMessages}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <MessageSend contactId={params.id} />
      <DeleteMessageModal />
    </>
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
