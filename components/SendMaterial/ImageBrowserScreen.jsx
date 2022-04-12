import * as React from 'react';
import {
  View,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';
import { postFail } from '../../redux/ducks/files';
import { useDispatch } from 'react-redux';
 
 const ImageBrowserScreen = (props) => {
  const { navigate } = props.navigation;

  const dispatch = useDispatch();
  // demo app use props.navigation to set the "Done" button in the header
  // this is sloppy, but we need to somehow store a way to call onSubmit
  // so store some JSX here
  const [header, setHeader] = React.useState();

  // same as demo
  const _processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.PNG }
    );
    return file;
  };

  // edited from demo to remove navigation
  // instead, call the `onComplete` function from props
  const imagesCallback = (callback) => {
    callback
      .then(async (photos) => {
        const cPhotos = [];
        for (let photo of photos) {
          console.log(photo);
          const pPhoto = await _processImageAsync(photo.uri);
          cPhotos.push({
            uri: pPhoto.uri,
            name: photo.filename,
            type: 'image/jpg',
          });
        }
        dispatch(postFail(cPhotos, 'photo'));
        navigate('ModalAddFile')
        console.log(cPhotos);
      })
      .catch((e) => console.log(e));
  };

  // edited from demo version -- instead of updating the navigation bar, store to component state
  const updateHandler = (count, onSubmit) => {
    setHeader(
      <>
        <Text>{count} Photos Selected</Text>
        <Button
          title="Done"
          onPress={() => {
            console.log('pressed done');
            onSubmit();
          }}
        />
      </>
    );
  };

  // same as demo
  const renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  // edited text
  const emptyStayComponent = (
    <Text style={styles.emptyStay}>No Photos Selected</Text>
  );

  return (
    <View style={[styles.flex, styles.container]}>
      {header}
      <ImageBrowser
        max={4}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
        emptyStayComponent={emptyStayComponent}
        mediaType="photo"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    position: 'relative',
  },
  emptyStay: {
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF',
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff',
  },
});

export default ImageBrowserScreen;