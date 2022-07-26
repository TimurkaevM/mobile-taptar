import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EffectItem from './EffectItem';
import { openModalEffect } from '../../redux/ducks/application';

const AddEffects = ({ effectsUser }) => {
  const dispatch = useDispatch();

  const effects = useSelector((state) => state.tags.effects);

  const onPress = (item, check) => {
    dispatch(openModalEffect({ item, check }));
  };

  return (
    <View style={styles.inputTitleContainer}>
      <View style={styles.flexTags}>
        {effects.map((item) => {
          const check = effectsUser.some((century) => century.id === item.id);

          const colorIcon = check ? 'green' : '#bed1e6';
          const color = check ? 'green' : '#4686cc';

          return (
            <EffectItem
              check={check}
              key={item.id}
              item={item}
              colorIcon={colorIcon}
              textColor={{ color }}
              handlePress={onPress}
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
    justifyContent: 'space-between',
  },
});

export default AddEffects;
