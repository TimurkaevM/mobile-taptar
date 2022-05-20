import { View, Text, Pressable, FlatList } from 'react-native';
import React from 'react';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import VideoListIcon from '../../SvgIcons/VideoListIcon';
import { useSelector } from 'react-redux';
import DeleteBtn from '../../SvgIcons/DeleteBtn';
import { Video } from 'expo-av';

const VideoList = () => {
  const video = useSelector((state) => state.files.materials.video.one);

  const renderVideo = ({ item }) => {
    const title = item.title === null ? '' : item.title;
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
              uri: `https://api.taptar.ru/storage/${item.path}`,
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
          Видео
        </Text>
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
