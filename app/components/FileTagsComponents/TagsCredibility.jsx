import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import CredibilityItem from './CredibilityItem';

const TagsCredibility = ({ credibility }) => {
  return (
    <View style={styles.inputTitleContainer}>
      <Text style={styles.textStyle}>Достоверность:</Text>
      <View style={styles.flexTags}>
        {credibility.map((item) => {
          return <CredibilityItem key={item.id} item={item} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: '#000',
    fontWeight: 'bold',
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
