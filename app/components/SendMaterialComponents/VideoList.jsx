import { View, Text, Pressable, FlatList } from 'react-native';
import React from 'react';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import VideoListIcon from '../../SvgIcons/SendMaterialIcons/VideoListIcon';
import DeleteBtn from './DeleteBtn';
import { Video } from 'expo-av';

const VideoList = ({ video, navigate }) => {
  const renderVideo = ({ item }) => {
    const title = item.title === null ? '' : item.title;
    const titleSub = title.substr(0, 12);
    const titleFile = title;

    const changeTitle = titleFile.length >= 12 ? `${titleSub}...` : titleFile;
    return (
      <View>
        <View style={sendMaterialStyles.mediaBox}>
          <DeleteBtn item={item} />
          <Pressable
            style={{ width: '100%', height: '100%' }}
            onPress={() => navigate('ChangeTagsScreen', { item: item })}
          >
            <Video
              style={sendMaterialStyles.mediaImage}
              source={{
                uri: `https://api.taptar.ru/storage/${item.path}`,
              }}
              useNativeControls={false}
              resizeMode="contain"
              // isLooping
            />
          </Pressable>
        </View>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 10,
            fontWeight: '400',
            fontSize: 15,
            fontFamily: 'GothamMedium',
          }}
        >
          {title ? changeTitle : 'Нет названия'}
        </Text>
      </View>
    );
  };

  return (
    <View style={sendMaterialStyles.mediaContainer}>
      <View style={sendMaterialStyles.mediaHeader}>
        <VideoListIcon />
        <Text style={sendMaterialStyles.mediaHeaderTitle}>Видео</Text>
      </View>
      <FlatList
        horizontal
        data={video}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default VideoList;
