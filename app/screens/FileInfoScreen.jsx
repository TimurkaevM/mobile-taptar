import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  ScrollView,
  Text,
} from 'react-native';
import InputInfoBox from '../components/FileInfoComponents/InputInfoBox';
import CommentClient from '../components/FileInfoComponents/CommentClient';
import TagsInformation from '../components/FileInfoComponents/TagsInformation';
import TagsCenturies from '../components/FileInfoComponents/TagsCenturies';
import StatusBarPlaceHolder from '../misc/StatusBarPlaceHolder';
import {
  getCabinetFile,
  getContributionFile,
} from '../redux/ducks/showFileCabinet';
import MediaBoxFile from '../components/FileInfoComponents/MediaBoxFile';
import TagsCredibility from '../components/FileInfoComponents/TagsCredibility';

const AddTagsScreen = (props) => {
  const { params } = props.route;

  const dispatch = useDispatch();

  const loadingFiles = useSelector((state) => state.showFileCabinet.loading);
  const file = useSelector((state) => state.showFileCabinet.file);
  const currentUser = useSelector((state) => state.user.currentUser);

  const { role } = currentUser;

  React.useEffect(() => {
    if (params.id !== undefined) {
      if (role === 'user') {
        dispatch(getContributionFile(params.id));
      } else {
        dispatch(getCabinetFile(params.id));
      }
    }
  }, [dispatch, params.id]);

  if (loadingFiles)
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size={50} color="#4686cc" />
      </View>
    );

  return (
    <>
      <StatusBarPlaceHolder />
      <View style={styles.centeredView}>
        <ScrollView>
          <InputInfoBox />
          <MediaBoxFile />
          {file?.comment && <CommentClient />}
          <TagsCredibility />
          {file?.tags_information?.length || file?.tags_century?.length ? (
            <Text
              style={{ paddingHorizontal: 20, marginBottom: 30, fontSize: 18 }}
            >
              Добавленные:
            </Text>
          ) : null}
          <TagsInformation />
          <TagsCenturies />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: 'center',
  },
  tinyLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  centeredView: {
    flex: 1,
    backgroundColor: '#fff',
  },

  modalView: {
    margin: 20,
    alignItems: 'flex-start',
  },

  media: {
    height: 300,
    overflow: 'hidden',
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
    elevation: 5,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  inputTitleContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
});

export default AddTagsScreen;
