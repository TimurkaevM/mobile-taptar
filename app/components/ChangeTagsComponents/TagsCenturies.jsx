import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AddInformation from './AddInformation';
import { useSelector } from 'react-redux';

const TagsCenturies = ({
  centuryClient,
  setCenturyClient,
}) => {
  const centuries = useSelector((state) => state.tags.centuries);

  const pressChangeCenturies = (tag, check) => {
    if (check) {
      const filteredCenturies = centuryClient.filter( item => item.id !== tag.id);
      setCenturyClient(filteredCenturies);
      return;
    }
    const addCenturies = [...centuryClient, tag]
    setCenturyClient(addCenturies);
  };

  return (
    <View style={styles.inputTitleContainer}>
      <Text>Период/Век:</Text>
      <View style={styles.flexTags}>
        {centuries.map((item) => {
          const check = centuryClient.some(
            (century) => century.id === item.id,
          );

          const backgroundColor = check ? '#4686cc' : '#bed1e6';
          const color = check ? 'white' : 'white';

          return (
            <AddInformation
              check={check}
              key={item.id}
              item={item}
              backgroundColor={{ backgroundColor }}
              textColor={{ color }}
              handlePress={pressChangeCenturies}
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
  },

  flexTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default TagsCenturies;
