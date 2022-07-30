import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import AudioBottomItemIcon from '../../SvgIcons/SendMaterialIcons/AudioBottomItemIcon';
import AudioTopItemIcon from '../../SvgIcons/SendMaterialIcons/AudioTopItemIcon';
import AudioListIcon from '../../SvgIcons/SendMaterialIcons/AudioListIcon';
import { AntDesign } from '@expo/vector-icons';

const AudioList = ({
  removeFileInMaterials,
  addFileInMaterials,
  materials,
}) => {
  const audio = useSelector((state) => state.messages.materials?.audio);

  const renderAudio = ({ item }) => {
    const title = item.title === null ? '' : item.title;
    const titleSub = title.substr(0, 12);
    const titleFile = title;

    const checkFile = materials.some((material) => material === item.id);

    const changeTitle = titleFile.length >= 12 ? `${titleSub}...` : titleFile;
    return (
      <View>
        <View style={styles.mediaBoxBlue}>
          <Pressable
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
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
            <AudioTopItemIcon width={50} height={30} color="#fff" />
            <AudioBottomItemIcon width={50} height={30} color="#fff" />
          </Pressable>
        </View>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 10,
            fontWeight: '400',
            fontSize: 10,
            fontFamily: 'GothamMedium',
          }}
        >
          {title ? changeTitle : 'Нет названия'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.mediaContainer}>
      <View style={styles.mediaHeader}>
        <AudioListIcon />
        <Text style={styles.mediaHeaderTitle}>Аудио</Text>
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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  mediaContainer: {
    marginTop: 10,
    alignItems: 'center',
  },

  mediaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    width: width - 40,
    borderBottomWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
    borderColor: '#4686cc',
  },

  mediaHeaderTitle: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 15,
    marginLeft: 10,
    fontFamily: 'GothamMedium',
    color: '#4686cc',
  },
  mediaBoxBlue: {
    width: 100,
    height: 100,
    margin: 20,
    backgroundColor: '#bed1e6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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

export default AudioList;
