import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import InputInfoBox from '../components/AddTagsComponents/InputInfoBox';
import CommentClient from '../components/AddTagsComponents/CommentClient';
import TagsInformation from '../components/AddTagsComponents/TagsInformation';
import TagsCenturies from '../components/AddTagsComponents/TagsCenturies';
import AddTagsHeader from '../components/AddTagsComponents/AddTagsHeader';
import StatusBarPlaceHolder from '../misc/StatusBarPlaceHolder';
import MediaBox from '../components/AddTagsComponents/MediaBox';
import MaterialText from '../components/AddTagsComponents/MaterialText';
import TagsCredibility from '../components/AddTagsComponents/TagsCredibility';

const AddTagsScreen = (props) => {
  const { navigate } = props.navigation;

  const { params } = props.route;

  const text = params?.type;

  const progress = useSelector((state) => state.uploadFiles.progress);
  const loading = useSelector((state) => state.uploadFiles.loading);
  const currentUser = useSelector((state) => state.user.currentUser);

  const { role } = currentUser;

  const [nameError, setNameError] = useState(null);
  const [yearError, setYearError] = useState(null);
  const [authorError, setAuthorError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [credibilityError, setCredibilityError] = useState(null);

  if (loading)
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size={50} color="#4686cc" />
        <Text
          style={{
            textAlign: 'center',
            marginTop: 10,
            textTransform: 'capitalize',
            fontWeight: '400',
            fontSize: 20,
            color: '#4686cc',
          }}
        >
          {progress} %
        </Text>
      </View>
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
        setTextError={setTextError}
        nameError={nameError}
        textError={textError}
        authorError={authorError}
        commentError={commentError}
        yearError={yearError}
        credibilityError={credibilityError}
        setCredibilityError={setCredibilityError}
        materialText={text}
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
          {text ? (
            <MaterialText textError={textError} setTextError={setTextError} />
          ) : (
            <MediaBox />
          )}
          <CommentClient
            setCommentError={setCommentError}
            commentError={commentError}
          />
          {role === 'user' ? null : (
            <TagsCredibility
              setCredibilityError={setCredibilityError}
              credibilityError={credibilityError}
            />
          )}
          <TagsInformation />
          <TagsCenturies />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  preloader: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AddTagsScreen;
