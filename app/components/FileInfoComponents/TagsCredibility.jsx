import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import CredibilityItem from './CredibilityItem';

const TagsCredibility = () => {
  const file = useSelector((state) => state.showFileCabinet.file);

  if (!file.tags_credibility) return null;

  return (
    <View style={styles.inputTitleContainer}>
      <Text style={styles.textStyle}>Достоверность:</Text>
      <View style={styles.flexTags}>
        {file.tags_credibility.map((item) => {
          return <CredibilityItem key={item.id} item={item} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: '#000',
    textAlign: 'left',
    marginBottom: 20,
    fontSize: 18,
    fontFamily: 'GothamMedium',
  },

  inputTitleContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 40,
  },

  flexTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default TagsCredibility;
