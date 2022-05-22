import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import AddFileButton from '../components/SendMaterialComponents/AddFileButton';
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

function SendMaterialScreen(props) {
  const { navigate, push } = props.navigation;

  const loading = useSelector((state) => state.files.loading);
  const draftError = useSelector((state) => state.files.draftError);
  const photo = useSelector((state) => state.files.materials.photo.one);
  const video = useSelector((state) => state.files.materials.video.one);
  const audio = useSelector((state) => state.files.materials.audio.one);
  const document = useSelector((state) => state.files.materials.document.one);
  const videos = useSelector((state) => state.files.materials.video.group);
  const photos = useSelector((state) => state.files.materials.photo.group);
  const audios = useSelector((state) => state.files.materials.audio.group);
  const documents = useSelector(
    (state) => state.files.materials.document.group,
  );

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
    <>
      <StatusBarPlaceHolder />
      <SendMaterialHeader />
      <ScrollView>
        <MaterialTitle />
        <MaterialText navigate={navigate} />
        <AddFileButton push={push} navigate={navigate} />
        {photo.length ? <ImageList navigate={navigate} /> : null}
        {photos.length ? <ImagesList navigate={navigate} /> : null}
        {video.length ? <VideoList navigate={navigate} /> : null}
        {videos.length ? <VideosList navigate={navigate} /> : null}
        {document.length ? <DocumentList navigate={navigate} /> : null}
        {documents.length ? <DocumentsList navigate={navigate} /> : null}
        {audio.length ? <AudioList navigate={navigate} /> : null}
        {audios.length ? <AudiosList navigate={navigate} /> : null}
        <DeleteFileModal />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default SendMaterialScreen;
