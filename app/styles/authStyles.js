import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const authStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  content: {
    width: width,
    height: height - 50,
    justifyContent: 'center',
  },

  auth: {
    width: '100%',
    height: '100%',
    fontSize: 16,
    fontWeight: '300',
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
    fontFamily: 'GothamMedium',
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
    fontFamily: 'GothamMedium',
    borderColor: '#4686cc',
  },

  inputFocus: {
    // width: "100%",
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
    marginHorizontal: 'auto',
    width: 200,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: '#4382c8',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  textError: {
    textAlign: 'center',
    marginTop: 15,
    color: 'red',
    fontFamily: 'GothamMedium',
  },
});
