import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import color from '../../misc/color';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/ducks/contacts';

const ContactHeader = ({}) => {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.contacts.filter);

  const changeFilterText = (event) => {
    dispatch(setFilter(event.nativeEvent.text));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={filter}
        placeholder="Введите текст..."
        onChange={changeFilterText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    // height: 200,
    padding: 10,
    borderWidth: 0.6,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: color.MAIN_COLOR,
    color: '#000',
    fontSize: 13,
  },
});

export default ContactHeader;
