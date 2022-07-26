import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import InputInfoBox from '../components/ChangeTagsComponents/InputInfoBox';
import CommentClient from '../components/ChangeTagsComponents/CommentClient';
import TagsInformation from '../components/ChangeTagsComponents/TagsInformation';
import TagsCenturies from '../components/ChangeTagsComponents/TagsCenturies';
import TagsCredibility from '../components/ChangeTagsComponents/TagsCredibility';
import AddTagsHeader from '../components/ChangeTagsComponents/AddTagsHeader';
import StatusBarPlaceHolder from '../misc/StatusBarPlaceHolder';
import MediaBox from '../components/ChangeTagsComponents/MediaBox';
import MaterialText from '../components/ChangeTagsComponents/MaterialText';
import BookmarkBtn from '../components/ChangeTagsComponents/BookmarkBtn';
import AddEffects from '../components/ChangeTagsComponents/AddEffects';
import ModalEffect from '../components/ChangeTagsComponents/ModalEffect';

const ChangeHistorianTagsScreen = (props) => {
  const { navigate } = props.navigation;

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
  const [credibilityClient, setCredibilityClient] = useState(
    item.tags_credibility,
  );
  const [effects, setEffects] = useState(item.effects);
  const [albums, setAlbums] = useState(item.albums);
  const [bookmark, setBookmark] = useState(item.bookmark);

  const [nameError, setNameError] = useState(null);
  const [yearError, setYearError] = useState(null);
  const [authorError, setAuthorError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [credibilityError, setCredibilityError] = useState(null);

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
        credibilityError={credibilityError}
        setCredibilityError={setCredibilityError}
        authorError={authorError}
        commentError={commentError}
        yearError={yearError}
        title={title}
        year={year}
        location={location}
        author={author}
        comment={comment}
        credibilityClient={credibilityClient}
        centuryClient={centuryClient}
        informationClient={informationClient}
        item={item}
        effects={effects}
        albums={albums}
        bookmark={bookmark}
      />
      <View style={styles.centeredView}>
        <ScrollView>
          <BookmarkBtn bookmark={bookmark} setBookmark={setBookmark} />
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
          <AddEffects effectsUser={effects} />
          <CommentClient
            setCommentError={setCommentError}
            commentError={commentError}
            setComment={setComment}
            comment={comment}
          />
          <TagsCredibility
            credibilityClient={credibilityClient}
            setCredibilityClient={setCredibilityClient}
            setCredibilityError={setCredibilityError}
            credibilityError={credibilityError}
          />
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
      <ModalEffect effectsUser={effects} setEffectsUser={setEffects} />
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

export default ChangeHistorianTagsScreen;
