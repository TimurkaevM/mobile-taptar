import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AddInformation from './AddInformation';

const TagsCredibility = ({ credibility }) => {
  return (
    <View style={styles.inputTitleContainer}>
      <Text style={styles.textStyle}>Достоверность:</Text>
      <View style={styles.flexTags}>
        {credibility.map((item) => {
          const backgroundColor = '#4686cc';
          const color = 'white';

          return (
            <AddInformation
              key={item.id}
              item={item}
              backgroundColor={{ backgroundColor }}
              textColor={{ color }}
            />
          );
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
