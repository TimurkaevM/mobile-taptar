import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export const socialStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontWeight: '400',
    textTransform: 'capitalize',
    fontSize: 15,
    paddingLeft: 15,
    paddingBottom: 10,
    color: '#4686cc',
    fontFamily: 'GothamMedium',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 200,
    marginTop: 10,
  },
  iconBtn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
