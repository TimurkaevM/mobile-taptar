import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ImageList from './ImageList';
import VideoList from './VideoList';
import DocumentList from './DocumentList';
import AudioList from './AudioList';
import { addingMaterialFile } from '../../redux/ducks/messages';
import CloseIcon from '../../SvgIcons/CloseIcon.jsx/CloseIcon';
import color from '../../misc/color';

const RoomFiles = ({ closeModal, setPickRoomFiles }) => {
  const dispatch = useDispatch();

  const [materials, setMaterials] = useState([]);

  const photo = useSelector((state) => state.messages.materials?.photo);
  const video = useSelector((state) => state.messages.materials?.video);
  const audio = useSelector((state) => state.messages.materials?.audio);
  const document = useSelector((state) => state.messages.materials?.document);

  const roomId = useSelector((state) => state.messages.room?.id);

  const addFileInMaterials = (id) => {
    setMaterials([...materials, id]);
  };

  const removeFileInMaterials = (id) => {
    setMaterials(materials.filter((material) => material !== id));
  };

  const handleSendClick = () => {
    if (materials.length === 0) return;

    materials.forEach((element) => {
      dispatch(addingMaterialFile(roomId, element));
    });
    closeModal();
    setMaterials([]);
  };

  const closePickRoom = () => {
    setPickRoomFiles(false);
    setMaterials([]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={closePickRoom} style={styles.btnClose}>
        <CloseIcon />
      </TouchableOpacity>
      <ScrollView>
        {photo.length ? (
          <ImageList
            materials={materials}
            removeFileInMaterials={removeFileInMaterials}
            addFileInMaterials={addFileInMaterials}
          />
        ) : null}
        {video.length ? (
          <VideoList
            materials={materials}
            removeFileInMaterials={removeFileInMaterials}
            addFileInMaterials={addFileInMaterials}
          />
        ) : null}
        {document.length ? (
          <DocumentList
            materials={materials}
            removeFileInMaterials={removeFileInMaterials}
            addFileInMaterials={addFileInMaterials}
          />
        ) : null}
        {audio.length ? (
          <AudioList
            materials={materials}
            removeFileInMaterials={removeFileInMaterials}
            addFileInMaterials={addFileInMaterials}
          />
        ) : null}
        <TouchableOpacity onPress={handleSendClick} style={styles.btnSave}>
          <Text style={styles.btnSaveText}>Отправить</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    maxHeight: height - 200,
    paddingTop: 50,
  },
  btnClose: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 8,
    right: 10,
  },
  btnSave: {
    width: 200,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.MAIN_COLOR,
    marginBottom: 20,
  },
  btnSaveText: {
    color: color.APP_BG,
  },
});

export default RoomFiles;
