import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import {
  addedCredibility,
  removeCredibility,
} from '../../redux/ducks/userTags';
import { useDispatch, useSelector } from 'react-redux';
import AddCredibility from './AddCredibility';

const TagsCredibility = ({ setCredibilityError, credibilityError }) => {
  const dispatch = useDispatch();

  const credibilityClient = useSelector(
    (state) => state.userTags.tags_credibility,
  );
  const credibility = useSelector((state) => state.tags.credibility);

  const pressChangeCredibility = (tag, check) => {
    if (check) return dispatch(removeCredibility(tag.id));
    if (credibilityError) {
      setCredibilityError(null);
    }

    return dispatch(addedCredibility(tag));
  };

  return (
    <View style={styles.inputTitleContainer}>
      <Text style={styles.textStyle}>Достоверность:</Text>
      <View style={styles.flexTags}>
        {credibility.map((item) => {
          const check = credibilityClient.some(
            (century) => century.id === item.id,
          );

          const backgroundColor = check ? '#4686cc' : '#bed1e6';
          const color = check ? 'white' : 'white';

          return (
            <AddCredibility
              check={check}
              key={item.id}
              item={item}
              backgroundColor={{ backgroundColor }}
              textColor={{ color }}
              handlePress={pressChangeCredibility}
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
    textAlign: 'left',
    marginBottom: 20,
    fontSize: 18,
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

export default TagsCredibility;
