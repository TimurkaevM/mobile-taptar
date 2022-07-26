import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import InputInfoBox from '../components/FileTagsComponents/InputInfoBox';
import CommentClient from '../components/FileTagsComponents/CommentClient';
import TagsInformation from '../components/FileTagsComponents/TagsInformation';
import TagsCenturies from '../components/FileTagsComponents/TagsCenturies';
import AddTagsHeader from '../components/FileTagsComponents/AddTagsHeader';
import StatusBarPlaceHolder from '../misc/StatusBarPlaceHolder';
import MaterialText from '../components/FileTagsComponents/MaterialText';
import MediaBoxFile from '../components/FileTagsComponents/MediaBoxFile';
import TagsCredibility from '../components/FileTagsComponents/TagsCredibility';

const FileTagsScreen = (props) => {
  const { goBack } = props.navigation;

  const { params } = props.route;

  const item = params.item;

  return (
    <>
      <StatusBarPlaceHolder />
      <AddTagsHeader goBack={goBack} />
      <View style={styles.centeredView}>
        <ScrollView>
          <InputInfoBox
            title={item.title}
            year={item.year}
            location={item.location}
            author={item.author}
          />
          {item.type === 'text' ? (
            <MaterialText />
          ) : (
            <MediaBoxFile item={item} />
          )}
          {item.comment && <CommentClient comment={item.comment} />}
          <TagsCredibility credibility={item.tags_credibility} />
          {item.tags_information.length || item.tags_century.length ? (
            <Text
              style={{
                paddingHorizontal: 20,
                marginBottom: 30,
                fontSize: 18,
                fontFamily: 'GothamMedium',
              }}
            >
              Добавленные:
            </Text>
          ) : null}
          <TagsInformation informationClient={item.tags_information} />
          <TagsCenturies centuryClient={item.tags_century} />
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
