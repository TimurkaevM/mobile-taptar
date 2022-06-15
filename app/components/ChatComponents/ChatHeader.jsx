import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import AvatarIcon from '../../SvgIcons/AvatarIcon/AvatarIcon';

const ChatHeader = ({ goBack }) => {
  const companion = useSelector((state) => state.messages.companions[0]);

  const onPressClose = () => {
    goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onPressClose} style={styles.btn}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          {companion.avatar ? (
            <Image
              style={styles.avatar}
              source={{
                uri: `https://api.taptar.ru/storage/avatars/${companion.avatar}`,
              }}
            />
          ) : (
            <AvatarIcon color="#fff" />
          )}
        </View>
        <Text style={styles.title}>{companion.name}</Text>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 0.6,
    borderBottomColor: '#878787',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#878787',
    borderRadius: 50,
    padding: 2,
    marginRight: 15,
    marginLeft: 20,
  },
  avatar: {
    borderRadius: 70,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    width: width - 210,
    color: '#878787',
    fontWeight: '600',
  },
});

export default ChatHeader;
