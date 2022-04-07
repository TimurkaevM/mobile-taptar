import { StyleSheet } from 'react-native';

export const registrStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },

  container: {
    justifyContent: 'center',
    paddingTop: 40,
    padding: 20,
  },

  auth: {
    width: '100%',
    height: '100%',
    fontSize: 16,
    fontWeight: '300',
  },

  or: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
    marginTop: 23,
  },

  title: {
    fontWeight: '400',
    textTransform: 'capitalize',
    fontSize: 15,
    paddingLeft: 15,
    paddingBottom: 10,
    color: '#4686cc',
  },

  input: {
    width: '100%',
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

  // .auth button:hover {
  //   box-shadow: inset 0 0 12px 2px rgba(0, 0, 0, 0.5);
  // }

  // .auth button:active {
  //   box-shadow: inset 0 0 12px 2px rgba(0, 0, 0, 0.5);
  // }
});
