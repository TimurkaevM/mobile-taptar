import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AddInformation from './AddInformation';
import { useSelector } from 'react-redux';

const TagsCenturies = () => {
  const file = useSelector((state) => state.showFileCabinet.file);

  return (
    <View style={styles.inputTitleContainer}>
      <Text>Период/Век:</Text>
      <View style={styles.flexTags}>
        {file.tags_century.map((item) => {
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

export default TagsCenturies;
