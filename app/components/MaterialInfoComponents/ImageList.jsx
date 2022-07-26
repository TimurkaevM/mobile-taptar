import { View, Text, Image, Pressable, FlatList } from 'react-native';
import React from 'react';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import ImageListIcon from '../../SvgIcons/SendMaterialIcons/ImageListIcon';
import { useSelector } from 'react-redux';

const ImageList = ({ navigate }) => {
  const photo = useSelector(
    (state) => state.cabinetMaterial.material.files.photo,
  );

  const renderImage = ({ item }) => {
    const title = item.title === null ? '' : item.title;
    const titleSub = title.substr(0, 12);
    const titleFile = title;

    const changeTitle = titleFile.length >= 12 ? `${titleSub}...` : titleFile;
    return (
      <View>
        <View style={sendMaterialStyles.mediaBox}>
          <Pressable
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
            onPress={() => navigate('FileTagsScreen', { item: item })}
          >
            <Image
              style={sendMaterialStyles.mediaImage}
              source={{
                uri: `https://api.taptar.ru/storage/${item.path_to_file}`,
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
            fontFamily: 'GothamMedium',
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
            fontFamily: 'GothamMedium',
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
