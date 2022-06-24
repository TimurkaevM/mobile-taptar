import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddBtnsUser from '../components/SendMaterialComponents/AddBtnsUser';
import DeleteFileModal from '../components/SendMaterialComponents/DeleteFileModal';
import ImageList from '../components/SendMaterialComponents/ImageList';
import ImagesList from '../components/SendMaterialComponents/ImagesList';
import VideoList from '../components/SendMaterialComponents/VideoList';
import VideosList from '../components/SendMaterialComponents/VideosList';
import DocumentList from '../components/SendMaterialComponents/DocumentList';
import DocumentsList from '../components/SendMaterialComponents/DocumentsList';
import AudiosList from '../components/SendMaterialComponents/AudiosList';
import AudioList from '../components/SendMaterialComponents/AudioList';
import MaterialTitle from '../components/SendMaterialComponents/MaterialTitle';
import MaterialText from '../components/SendMaterialComponents/MaterialText';
import StatusBarPlaceHolder from '../misc/StatusBarPlaceHolder';
import SendMaterialHeader from '../components/SendMaterialComponents/SendMaterialHeader';
import MaterialError from '../components/SendMaterialComponents/MaterialError';
import { getAllTags, getCauses } from '../redux/ducks/tags';
import { getDraftFiles } from '../redux/actions/material';

function SendMaterialScreen(props) {
  const { navigate, push } = props.navigation;

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.sendMaterial.loading);
  const draftError = useSelector((state) => state.sendMaterial.draftError);
  const photo = useSelector((state) => state.sendMaterial.materials.photo.one);
  const video = useSelector((state) => state.sendMaterial.materials.video.one);
  const audio = useSelector((state) => state.sendMaterial.materials.audio.one);
  const document = useSelector(
    (state) => state.sendMaterial.materials.document.one,
  );
  const videos = useSelector(
    (state) => state.sendMaterial.materials.video.group,
  );
  const photos = useSelector(
    (state) => state.sendMaterial.materials.photo.group,
  );
  const audios = useSelector(
    (state) => state.sendMaterial.materials.audio.group,
  );
  const documents = useSelector(
    (state) => state.sendMaterial.materials.document.group,
  );

  useEffect(() => {
    dispatch(getDraftFiles());
  }, [dispatch, draftError]);

  useEffect(() => {
    dispatch(getAllTags());
    dispatch(getCauses());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size={50} color="#4686cc" />
      </View>
    );
  }

  return draftError ? (
    <MaterialError />
  ) : (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBarPlaceHolder />
      <SendMaterialHeader />
      <ScrollView>
        <MaterialTitle />
        <MaterialText navigate={navigate} />
        <AddBtnsUser push={push} navigate={navigate} />
        {photo.length ? <ImageList photo={photo} navigate={navigate} /> : null}
        {photos.length ? <ImagesList navigate={navigate} /> : null}
        {video.length ? <VideoList video={video} navigate={navigate} /> : null}
        {videos.length ? <VideosList navigate={navigate} /> : null}
        {document.length ? (
          <DocumentList document={document} navigate={navigate} />
        ) : null}
        {documents.length ? <DocumentsList navigate={navigate} /> : null}
        {audio.length ? <AudioList audio={audio} navigate={navigate} /> : null}
        {audios.length ? <AudiosList navigate={navigate} /> : null}
        <DeleteFileModal />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default SendMaterialScreen;
