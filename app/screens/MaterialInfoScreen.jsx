import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ImageList from '../components/MaterialInfoComponents/ImageList';
import VideoList from '../components/MaterialInfoComponents/VideoList';
import DocumentList from '../components/MaterialInfoComponents/DocumentList';
import AudioList from '../components/MaterialInfoComponents/AudioList';
import MaterialTitle from '../components/MaterialInfoComponents/MaterialTitle';
import MaterialText from '../components/MaterialInfoComponents/MaterialText';
import StatusBarPlaceHolder from '../misc/StatusBarPlaceHolder';
import MaterialError from '../components/MaterialInfoComponents/MaterialError';
import { getContributionMaterial } from '../redux/ducks/cabinetMaterial';

function MaterialInfoScreen(props) {
  const { navigate } = props.navigation;
  const { params } = props.route;

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.cabinetMaterial.loading);
  const photos = useSelector(
    (state) => state.cabinetMaterial.material.files.photo,
  );
  const audios = useSelector(
    (state) => state.cabinetMaterial.material.files.audio,
  );
  const videos = useSelector(
    (state) => state.cabinetMaterial.material.files.video,
  );
  const documents = useSelector(
    (state) => state.cabinetMaterial.material.files.document,
  );

  React.useEffect(() => {
    if (params.id !== undefined) {
      dispatch(getContributionMaterial(params.id));
    }
  }, [params.id]);

  if (loading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size={50} color="#4686cc" />
      </View>
    );
  }

  return (
    <>
      <StatusBarPlaceHolder />
      <ScrollView>
        <MaterialTitle />
        <MaterialText navigate={navigate} />
        {photos.length ? <ImageList navigate={navigate} /> : null}
        {videos.length ? <VideoList navigate={navigate} /> : null}
        {documents.length ? <DocumentList navigate={navigate} /> : null}
        {audios.length ? <AudioList navigate={navigate} /> : null}
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

export default MaterialInfoScreen;
