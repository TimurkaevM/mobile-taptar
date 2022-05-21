import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AddInformation from './AddInformation';
import { addedTypes, removeTypes } from '../../redux/ducks/files';
import { useDispatch, useSelector } from 'react-redux';

const TagsInformation = () => {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.tags.types);
  const typesClient = useSelector((state) => state.files.tags_information);

  const pressChangeInformation = (tag, check) => {
    if (check) return dispatch(removeTypes(tag.id));

    return dispatch(addedTypes(tag));
  };

  return (
    <View style={styles.inputTitleContainer}>
      <Text>Тип/Принадлежность:</Text>
      <View style={styles.flexTags}>
        {types.map((item) => {
          const check = typesClient.some((type) => type.id === item.id);

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
