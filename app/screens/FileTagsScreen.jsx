import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import InputInfoBox from '../components/FileTagsComponents/InputInfoBox';
import CommentClient from '../components/FileTagsComponents/CommentClient';
import TagsInformation from '../components/FileTagsComponents/TagsInformation';
import TagsCenturies from '../components/FileTagsComponents/TagsCenturies';
import AddTagsHeader from '../components/FileTagsComponents/AddTagsHeader';
import StatusBarPlaceHolder from '../misc/StatusBarPlaceHolder';
import MediaBox from '../components/FileTagsComponents/MediaBox';
import MaterialText from '../components/FileTagsComponents/MaterialText';

const FileTagsScreen = (props) => {
  const { navigate, goBack } = props.navigation;

  const { params } = props.route;

  const item = params.item;

  const [title, setTitle] = useState(item.title === null ? '' : item.title);
  const [year, setYear] = useState(item.year === null ? '' : item.year);
  const [author, setAuthor] = useState(item.author === null ? '' : item.author);
  const [location, setLocation] = useState(
    item.location === null ? '' : item.location,
  );

  const [comment, setComment] = useState(
    item.comment === null ? '' : item.comment,
  );

  //теги
  const [informationClient, setInformationClient] = useState(
    item.tags_information,
  );
  const [centuryClient, setCenturyClient] = useState(item.tags_century);

  const [nameError, setNameError] = useState(null);
  const [yearError, setYearError] = useState(null);
  const [authorError, setAuthorError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [textError, setTextError] = useState(null);

  return (
    <>
      <StatusBarPlaceHolder />
      <AddTagsHeader goBack={goBack} />
      <View style={styles.centeredView}>
        <ScrollView>
          <InputInfoBox
            setNameError={setNameError}
            setAuthorError={setAuthorError}
            setYearError={setYearError}
            nameError={nameError}
            authorError={authorError}
            yearError={yearError}
            title={title}
            year={year}
            location={location}
            author={author}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setYear={setYear}
            setLocation={setLocation}
          />
          {item.type === 'text' ? (
            <MaterialText textError={textError} setTextError={setTextError} />
          ) : (
            <MediaBox item={item} />
          )}
          <CommentClient comment={comment} setComment={setComment} />
          <TagsInformation
            informationClient={informationClient}
            setInformationClient={setInformationClient}
          />
          <TagsCenturies
            centuryClient={centuryClient}
            setCenturyClient={setCenturyClient}
          />
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

export default FileTagsScreen;
