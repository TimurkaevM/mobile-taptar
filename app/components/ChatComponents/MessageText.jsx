import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import DeleteBtn from './DeleteBtn';
import color from '../../misc/color';

const MessageText = ({ item, isUserProfile, index, roomId }) => {
  const { message, created_at, id } = item;

  return (
    <View
      style={[
        isUserProfile ? styles.messageOutGoing : styles.messageInComing,
        { marginTop: index === 0 ? 20 : 0 },
      ]}
    >
      <View
        style={
          isUserProfile ? styles.messageContentOut : styles.messageContentIn
        }
      >
        {isUserProfile ? <DeleteBtn id={id} roomId={roomId} /> : null}
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

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: 'center',
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

export default MessageText;
