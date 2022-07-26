import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';
import React from 'react';
import ImageListIcon from '../../SvgIcons/SendMaterialIcons/ImageListIcon';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

const ImageList = ({
  removeFileInMaterials,
  addFileInMaterials,
  materials,
}) => {
  const photo = useSelector((state) => state.messages.materials?.photo);

  const renderImage = ({ item }) => {
    const title = item.title === null ? '' : item.title;
    const titleSub = title.substr(0, 12);
    const titleFile = title;

    const checkFile = materials.some((material) => material === item.id);

    const changeTitle = titleFile.length >= 12 ? `${titleSub}...` : titleFile;
    return (
      <View>
        <View style={styles.mediaBox}>
          <Pressable
            style={{ width: '100%', height: '100%' }}
            onPress={
              checkFile
                ? () => removeFileInMaterials(item.id)
                : () => addFileInMaterials(item.id)
            }
          >
            {checkFile ? (
              <View style={styles.checkOn}>
                <AntDesign name="check" size={50} color="#fff" />
              </View>
            ) : null}
            <Image
              style={styles.mediaImage}
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
    <View style={styles.inputTitleContainer}>
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 15,
          borderBottomWidth: 1,
          marginBottom: 10,
          alignItems: 'center',
          borderColor: '#000',
          marginHorizontal: 20,
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

const styles = StyleSheet.create({
  inputTitleContainer: {
    // paddingHorizontal: 20,
    marginTop: 10,
  },
  mediaBox: {
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    width: 200,
    height: 150,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1.5,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  checkOn: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4caf50b3',
    zIndex: 2,
    borderRadius: 20,
  },
});

export default ImageList;
