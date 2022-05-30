import { View, Text, Pressable, FlatList } from 'react-native';
import React from 'react';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import { useSelector } from 'react-redux';
import AudioBottomItemIcon from '../../SvgIcons/SendMaterialIcons/AudioBottomItemIcon';
import AudioTopItemIcon from '../../SvgIcons/SendMaterialIcons/AudioTopItemIcon';
import AudioListIcon from '../../SvgIcons/SendMaterialIcons/AudioListIcon';

const AudioList = ({ navigate }) => {
  const audio = useSelector(
    (state) => state.cabinetMaterial.material.files.audio,
  );

  const renderAudio = ({ item }) => {
    const title = item.title === null ? '' : item.title;
    const titleSub = title.substr(0, 12);
    const titleFile = title;

    const changeTitle = titleFile.length >= 12 ? `${titleSub}...` : titleFile;
    return (
      <View>
        <View style={sendMaterialStyles.mediaBoxBlue}>
          <Pressable
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigate('FileTagsScreen', { item: item })}
          >
            <AudioTopItemIcon width={90} height={55} color="#fff" />
            <AudioBottomItemIcon width={200} height={50} color="#fff" />
          </Pressable>
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
        <AudioListIcon />
        <Text
          style={{
            textAlign: 'left',
            fontWeight: '400',
            fontSize: 15,
            marginLeft: 10,
          }}
        >
          Аудио
        </Text>
      </View>
      <FlatList
        horizontal
        data={audio}
        renderItem={renderAudio}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AudioList;