import { StyleSheet } from 'react-native';

export const sendMaterialStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ff00ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputTitleContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  inputTitle: {
    width: '100%',
    height: 50,
    paddingLeft: 15,
    borderWidth: 0.3,
    borderRadius: 7,
    marginBottom: 20,
    backgroundColor: '#fafafa',
    color: '#000',
    fontSize: 13,
  },

  inputText: {
    width: '100%',
    height: 200,
    padding: 20,
    borderWidth: 0.3,
    borderRadius: 8,
    marginBottom: 50,
    backgroundColor: '#fafafa',
    color: '#000',
    fontSize: 13,
    textAlignVertical: 'top',
  },

  btnAdd: {
    backgroundColor: '#fafafa',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },

  btnAddActive: {
    backgroundColor: '#fafafa',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },

  iconAdd: {
    transform: [{ rotate: '45deg' }],
  },

  btnAddMedia: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10,
    flexDirection: 'row',
    backgroundColor: '#4686cc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnAddVideo: {
    padding: 20,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mediaBox: {
    width: 200,
    height: 150,
    overflow: 'hidden',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  mediaBoxBlue: {
    width: 200,
    height: 150,
    overflow: 'hidden',
    margin: 20,
    backgroundColor: '#bed1e6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  mediaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
