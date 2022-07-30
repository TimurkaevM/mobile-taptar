import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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

  mediaContainer: {
    marginTop: 10,
    alignItems: 'center',
  },

  mediaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    width: width - 40,
    borderBottomWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
    borderColor: '#4686cc',
  },

  mediaHeaderTitle: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 15,
    marginLeft: 10,
    fontFamily: 'GothamMedium',
    color: '#4686cc',
  },

  inputTitle: {
    width: '100%',
    height: 50,
    paddingLeft: 15,
    borderRadius: 30,
    marginBottom: 50,
    backgroundColor: '#ffffff',
    color: '#000',
    fontSize: 13,
    borderWidth: 0.5,
    borderColor: '#4686cc',
    fontFamily: 'GothamMedium',
  },

  textTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  inputText: {
    width: '100%',
    height: 200,
    padding: 20,
    borderWidth: 0.3,
    borderRadius: 8,
    marginBottom: 70,
    backgroundColor: '#fafafa',
    color: '#000',
    fontSize: 13,
    textAlignVertical: 'top',
    borderColor: '#4686cc',
    fontFamily: 'GothamMedium',
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
    width: 95,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnAddIcon: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#4686cc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnAddText: {
    fontSize: 15,
    textTransform: 'capitalize',
    color: '#4686cc',
    fontFamily: 'GothamLight',
    marginTop: 10,
  },

  btnAddVideo: {
    padding: 20,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mediaBox: {
    position: 'relative',
    zIndex: 1,
    width: 200,
    height: 150,
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
    elevation: 1.5,
  },

  mediaBoxBlue: {
    width: 200,
    height: 150,
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
