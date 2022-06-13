import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadMessages } from '../redux/ducks/messages';
import DeleteMessageModal from '../components/ChatComponents/DeleteMessageModal';
import MessageText from '../components/ChatComponents/MessageText';
import MessageFile from '../components/ChatComponents/MessageFile';

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
      <View style={{ flex: 5.2, backgroundColor: '#fff' }}>
        <FlatList
          data={messages}
          renderItem={renderMessages}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={{ flex: 0.8, backgroundColor: '#fff' }}></View>
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
});

export default ChatScreen;
