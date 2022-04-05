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
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
  },

  iconAdd: {
    transform: [{ rotate: '45deg' }],
  },

  btnAddAudio: {
    backgroundColor: '#fafafa',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: '#000',
    borderLeftWidth: 1,
  },

  btnAddVideo: {
    backgroundColor: '#fafafa',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    borderLeftColor: '#000',
    borderLeftWidth: 1,
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

  mediaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
