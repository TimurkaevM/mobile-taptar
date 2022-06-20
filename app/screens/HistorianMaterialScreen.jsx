import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddBtnsHistorian from '../components/SendMaterialComponents/AddBtnsHistorian';
import DeleteFileModal from '../components/SendMaterialComponents/DeleteFileModal';
import ImageList from '../components/SendMaterialComponents/ImageList';
import VideoList from '../components/SendMaterialComponents/VideoList';
import DocumentList from '../components/SendMaterialComponents/DocumentList';
import AudioList from '../components/SendMaterialComponents/AudioList';
import MaterialTitle from '../components/SendMaterialComponents/MaterialTitle';
import MaterialText from '../components/SendMaterialComponents/MaterialText';
import StatusBarPlaceHolder from '../misc/StatusBarPlaceHolder';
import SendMaterialHeader from '../components/SendMaterialComponents/SendMaterialHeader';
import MaterialError from '../components/SendMaterialComponents/MaterialError';
import { getAllTags, getCauses } from '../redux/ducks/tags';
import { getHistorianDraftFiles } from '../redux/actions/historianMaterial';

function HistorianMaterialScreen(props) {
  const { navigate, push } = props.navigation;

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.historianMaterial.loading);
  const draftError = useSelector((state) => state.historianMaterial.draftError);
  const photo = useSelector((state) => state.historianMaterial.materials.photo);
  const video = useSelector((state) => state.historianMaterial.materials.video);
  const audio = useSelector((state) => state.historianMaterial.materials.audio);
  const document = useSelector(
    (state) => state.sendMaterial.materials.document,
  );

  useEffect(() => {
    dispatch(getHistorianDraftFiles());
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
    <>
      <StatusBarPlaceHolder />
      <SendMaterialHeader />
      <ScrollView>
        <MaterialTitle />
        <MaterialText navigate={navigate} />
        <AddBtnsHistorian push={push} navigate={navigate} />
        {photo.length ? <ImageList photo={photo} navigate={navigate} /> : null}
        {video.length ? <VideoList video={video} navigate={navigate} /> : null}
        {document.length ? (
          <DocumentList document={document} navigate={navigate} />
        ) : null}
        {audio.length ? <AudioList audio={audio} navigate={navigate} /> : null}
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

export default HistorianMaterialScreen;