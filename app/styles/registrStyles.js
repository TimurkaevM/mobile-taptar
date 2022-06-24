import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const registrStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  content: {
    width: width,
    height: height - 50,
    justifyContent: 'center',
  },

  or: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
    marginTop: 23,
  },

  title: {
    width: width > 450 ? 380 : width - 80,
    alignSelf: 'center',
    textAlign: 'left',
    fontWeight: '400',
    textTransform: 'capitalize',
    fontSize: 15,
    paddingLeft: 15,
    paddingBottom: 10,
    color: '#4686cc',
  },

  input: {
    width: width > 450 ? 380 : width - 80,
    alignSelf: 'center',
    height: 50,
    paddingLeft: 15,
    borderWidth: 0,
    borderRadius: 30,
    marginBottom: 50,
    backgroundColor: '#ffffff',
    color: '#4686cc',
    fontSize: 13,
    borderWidth: 0.5,
    borderColor: '#4686cc',
  },

  inputFocus: {
    height: 35,
    paddingLeft: 15,
    borderWidth: 0,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    fontSize: 13,
  },

  btn: {
    width: 200,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: '#4382c8',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
