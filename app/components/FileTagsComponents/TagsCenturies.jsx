import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AddInformation from './AddInformation';

const TagsCenturies = ({ centuryClient }) => {
  if (!centuryClient.length) return null;

  return (
    <View style={styles.inputTitleContainer}>
      <Text>Период/Век:</Text>
      <View style={styles.flexTags}>
        {centuryClient.map((item) => {
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
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'GothamMedium',
  },

  inputTitleContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  flexTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default TagsCenturies;
