import { View, Text, Image, Pressable, FlatList } from 'react-native';
import React from 'react';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import ImageListIcon from '../../SvgIcons/SendMaterialIcons/ImageListIcon';
import { useSelector } from 'react-redux';
import DeleteBtn from './DeleteBtn';

const ImagesList = ({ navigate }) => {
  const photos = useSelector(
    (state) => state.sendMaterial.materials.photo.group,
  );

  const renderImages = ({ item }) => {
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
            <Image
              style={sendMaterialStyles.mediaImage}
              source={{
                uri: `https://api.taptar.ru/storage/${item.files[0].path}`,
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
          borderColor: '#000',
          alignItems: 'center',
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
          Фото (группа файлов)
        </Text>
      </View>
      <FlatList
        horizontal
        data={photos}
        renderItem={renderImages}
        keyExtractor={(item) => item.group_uid}
      />
    </View>
  );
};

export default ImagesList;
