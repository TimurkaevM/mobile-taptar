import React from 'react';
import { ScrollView } from 'react-native';
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

function SendMaterialScreen(props) {
  const { navigate, push } = props.navigation;

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

  return (
    <ScrollView>
      <MaterialTitle />
      <MaterialText navigate={navigate} />
      <AddFileButton push={push} navigate={navigate} />
      {photo.length ? <ImageList /> : null}
      {photos.length ? <ImagesList /> : null}
      {video.length ? <VideoList /> : null}
      {videos.length ? <VideosList /> : null}
      {document.length ? <DocumentList /> : null}
      {documents.length ? <DocumentsList /> : null}
      {audio.length ? <AudioList /> : null}
      {audios.length ? <AudiosList /> : null}
      <DeleteFileModal />
    </ScrollView>
  );
}

export default SendMaterialScreen;
