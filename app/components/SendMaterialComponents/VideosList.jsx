import { View, Text, Pressable, FlatList } from 'react-native';
import React from 'react';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import VideoListIcon from '../../SvgIcons/SendMaterialIcons/VideoListIcon';
import { useSelector } from 'react-redux';
import DeleteBtn from './DeleteBtn';
import { Video } from 'expo-av';

const VideosList = () => {
  const videos = useSelector((state) => state.files.materials.video.group);

  const renderVideos = ({ item }) => {
    const title = item.files[0].title === null ? '' : item.files[0].title;
    const titleSub = title.substr(0, 12);
    const titleFile = title;

    const changeTitle = titleFile.length >= 12 ? `${titleSub}...` : titleFile;

    return (
      <View>
        <View style={sendMaterialStyles.mediaBox}>
          <DeleteBtn item={item} />
          <Video
            style={sendMaterialStyles.mediaImage}
            source={{
              uri: `https://api.taptar.ru/storage/${item.files[0].path}`,
            }}
            useNativeControls={false}
            resizeMode="contain"
            // isLooping
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 10,
            fontWeight: '400',
            fontSize: 15,
          }}
        >
          {title ? changeTitle : 'Нет названия'}
        </Text>
      </View>
    );
  };

  return (
    <View style={sendMaterialStyles.inputTitleContainer}>
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 15,
          borderBottomWidth: 1,
          marginBottom: 10,
          borderColor: '#000',
          alignItems: 'center',
        }}
      >
        <VideoListIcon />
        <Text
          style={{
            textAlign: 'left',
            fontWeight: '400',
            fontSize: 15,
            marginLeft: 10,
          }}
        >
          Видео (группа файлов)
        </Text>
      </View>
      <FlatList
        horizontal
        data={videos}
        renderItem={renderVideos}
        keyExtractor={(item) => item.group_uid}
      />
    </View>
  );
};

export default VideosList;
