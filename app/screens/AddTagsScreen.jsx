import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import InputInfoBox from '../components/AddTagsComponents/InputInfoBox';
import CommentClient from '../components/AddTagsComponents/CommentClient';
import TagsInformation from '../components/AddTagsComponents/TagsInformation';
import TagsCenturies from '../components/AddTagsComponents/TagsCenturies';
import AddTagsHeader from '../components/AddTagsComponents/AddTagsHeader';
import StatusBarPlaceHolder from '../misc/StatusBarPlaceHolder';
import MediaBox from '../components/AddTagsComponents/MediaBox';

const AddTagsScreen = (props) => {
  const { navigate } = props.navigation;

  const progress = useSelector((state) => state.files.progress);
  const loadingFiles = useSelector((state) => state.files.loadingFiles);

  const [nameError, setNameError] = useState(null);
  const [yearError, setYearError] = useState(null);
  const [authorError, setAuthorError] = useState(null);
  const [commentError, setCommentError] = useState(null);

  if (loadingFiles)
    return (
      <Text
        style={{
          textAlign: 'left',
          marginBottom: 10,
          textTransform: 'capitalize',
          fontWeight: '400',
          fontSize: 15,
        }}
      >
        {progress}
      </Text>
    );

  return (
    <>
      <StatusBarPlaceHolder />
      <AddTagsHeader
        navigate={navigate}
        setNameError={setNameError}
        setAuthorError={setAuthorError}
        setCommentError={setCommentError}
        setYearError={setYearError}
        nameError={nameError}
        authorError={authorError}
        commentError={commentError}
        yearError={yearError}
      />
      <View style={styles.centeredView}>
        <ScrollView>
          <InputInfoBox
            setNameError={setNameError}
            setAuthorError={setAuthorError}
            setYearError={setYearError}
            nameError={nameError}
            authorError={authorError}
            yearError={yearError}
          />
          <MediaBox />
          <CommentClient setCommentError={setCommentError} commentError={commentError} />
          <TagsInformation />
          <TagsCenturies />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
