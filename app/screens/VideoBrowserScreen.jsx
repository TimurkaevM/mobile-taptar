import React, { useMemo } from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { AssetsSelector } from 'expo-images-picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { MediaType } from 'expo-media-library';
import {
  postFilesGroup,
  postMediaFile,
  postMediaHistorian,
} from '../redux/ducks/uploadFiles';
import { addBrowserFile } from '../redux/ducks/messages';

const ForceInset = {
  top: 'never',
  bottom: 'never',
};

// IOS users , make sure u can use the images uri to upload , if your getting invalid file path or u cant work with asset-library://
// Use = > getImageMetaData: true which will be little slower but give u also the absolute path of the Asset. just console loge the result to see the localUri

// See => https://docs.expo.dev/versions/latest/sdk/media-library/#assetinfo

export default function VideoBrowserScreen(props) {
  const dispatch = useDispatch();

  const { navigate, goBack } = props.navigation;
  const { params } = props.route;

  const { media, min, max, currentRoom, contactId } = params;

  const causes = useSelector((state) => state.tags.causes);
  const causId = causes.map((caus) => caus.id);

  const onSuccess = (data) => {
    if (currentRoom === 'materialUser') {
      navigate('ModalAddFile');
      if (data.length > 1) return dispatch(postFilesGroup(data, media, causId));
      return dispatch(postMediaFile(data, media));
    }
    if (currentRoom === 'materialHistorian') {
      navigate('ModalAddFile');
      return dispatch(postMediaHistorian(data, media));
    }
    if (currentRoom === 'chat') {
      goBack();
      return dispatch(addBrowserFile(data, media, contactId));
    }
  };

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: 'black',
      errorMessages: {
        hasErrorWithPermissions: 'Please Allow media gallery permissions.',
        hasErrorWithLoading: 'There was an error while loading images.',
        hasErrorWithResizing: 'There was an error while loading images.',
        hasNoAssets: 'No images found.',
      },
    }),
    [],
  );

  console.log(max);

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: Platform.OS === 'ios', // true might perform slower results but gives meta data and absolute path for ios users
      initialLoad: 100,
      assetsType: [MediaType.video],
      minSelection: min,
      maxSelection: max,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    [],
  );

  const _textStyle = {
    color: 'white',
  };

  const _buttonStyle = {
    backgroundColor: '#4686cc',
    borderRadius: 15,
  };

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: 'загрузить',
        back: 'назад',
        selected: 'выбрано',
      },
      midTextColor: 'black',
      minSelection: 1,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,
      onBack: () => {
        goBack();
      },
      onSuccess: (e) => onSuccess(e),
    }),
    [],
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: '#fafafa',
      spinnerColor: 'blue',
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: 'ios-videocam',
        color: 'tomato',
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: 'ios-checkmark-circle-outline',
        color: 'white',
        bg: '#0eb14970',
        size: 26,
      },
    }),
    [],
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView forceInset={ForceInset} style={styles.container}>
        <View style={styles.container}>
          <AssetsSelector
            Settings={widgetSettings}
            Errors={widgetErrors}
            Styles={widgetStyles}
            Navigator={widgetNavigator}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
