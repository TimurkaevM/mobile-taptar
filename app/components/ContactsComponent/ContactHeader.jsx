import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import color from '../../misc/color';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/ducks/contacts';
import SearchIcon from '../../SvgIcons/ContactIcon/SearchIcon';

const ContactHeader = ({}) => {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.contacts.filter);

  const changeFilterText = (event) => {
    dispatch(setFilter(event.nativeEvent.text));
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <SearchIcon />
        <TextInput
          style={styles.input}
          value={filter}
          placeholder="Введите текст..."
          onChange={changeFilterText}
        />
      </View>
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
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    // height: 200,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 0.6,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderColor: '#878787',
  },
  input: {
    width: 240,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 13,
    marginLeft: 10,
  },
});

export default ContactHeader;
