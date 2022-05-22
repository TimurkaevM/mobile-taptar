import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AddInformation from './AddInformation';
import { useSelector } from 'react-redux';

const TagsInformation = ({ informationClient, setInformationClient }) => {
  const types = useSelector((state) => state.tags.types);

  const pressChangeInformation = (tag, check) => {
    if (check) {
      const filteredInformation = informationClient.filter(
        (item) => item.id !== tag.id,
      );
      setInformationClient(filteredInformation);
      return;
    }
    const addInformation = [...informationClient, tag];
    setInformationClient(addInformation);
  };

  return (
    <View style={styles.inputTitleContainer}>
      <Text>Тип/Принадлежность:</Text>
      <View style={styles.flexTags}>
        {types.map((item) => {
          const check = informationClient.some((type) => type.id === item.id);

          const backgroundColor = check ? '#4686cc' : '#bed1e6';
          const color = check ? 'white' : 'white';

          return (
            <AddInformation
              check={check}
              key={item.id}
              item={item}
              backgroundColor={{ backgroundColor }}
              textColor={{ color }}
              handlePress={pressChangeInformation}
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

export default TagsInformation;
