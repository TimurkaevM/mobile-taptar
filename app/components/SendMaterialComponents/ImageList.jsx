import { View, Text, Image, Pressable, FlatList } from 'react-native';
import React from 'react';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import ImageListIcon from '../../SvgIcons/SendMaterialIcons/ImageListIcon';
import { useSelector } from 'react-redux';
import DeleteBtn from './DeleteBtn';

const ImageList = () => {
  const photo = useSelector((state) => state.files.materials.photo.one);

  const renderImage = ({ item }) => {
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
            onPress={() => console.log('ddd')}
          >
            <Image
              style={sendMaterialStyles.mediaImage}
              source={{
                uri: `https://api.taptar.ru/storage/${item.path}`,
              }}
            />
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
          alignItems: 'center',
          borderColor: '#000',
        }}
      >
        <ImageListIcon />
        <Text
          style={{
            textAlign: 'left',
            fontWeight: '400',
            fontSize: 15,
            marginLeft: 10,
          }}
        >
          Фото
        </Text>
      </View>
      <FlatList
        horizontal
        data={photo}
        renderItem={renderImage}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ImageList;
