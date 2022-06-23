import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainEffectIcons from '../../SvgIcons/EffectsIcons/MainEffectIcons';

function EffectItem({ item, colorIcon, textColor, check, handlePress }) {
  return (
    <TouchableOpacity
      onPress={() => handlePress(item, check)}
      style={styles.item}
    >
      <MainEffectIcons title={item.title} color={colorIcon} size={40} />
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 8,
    marginRight: 8,
    borderRadius: 25,
  },
  title: {
    fontSize: 13,
  },
});

export default EffectItem;
