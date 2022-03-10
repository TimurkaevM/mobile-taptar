import { StyleSheet } from 'react-native';

export const registrStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'linear-gradient(rgba(35, 43, 85, 0.75), rgba(35, 43, 85, 0.95))',
  },

  container: {
    justifyContent: 'center',
    paddingTop: 40,
    padding: 20,
  },

  auth: {
    width: "100%",
    height: "100%",
    fontSize: 16,
    fontWeight: "300",
  },
  
  or: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 20,
    marginTop: 23,
  },
  
  title: {
    fontWeight: "400",
    textTransform: "uppercase",
    fontSize: 13,
    paddingLeft: 15,
    paddingBottom: 10,
    color: "rgba(255, 255, 255, 0.7)",
    // display: "block",
  },
  
  input: {
    width: "100%",
    height: 50,
    paddingLeft: 15,
    borderWidth: 0,
    borderRadius: 10,
    marginBottom: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#ffffff",
    fontSize: 13,
  },
  
  inputFocus: {
    // width: "100%",
    height: 35,
    paddingLeft: 15,
    borderWidth: 0,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#ffffff",
    fontSize: 13,
  },
  
  btn: {
    width: 300,
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: 13,
    textAlign: "center",
    color: "rgba(255, 255, 255, 1)",
    width: "100%",
    height: 35,
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 23,
    backgroundColor: "rgba(16, 89, 255, 1)",
    // transition: "all 0.5s ease",
  }
  
  // .auth button:hover {
  //   box-shadow: inset 0 0 12px 2px rgba(0, 0, 0, 0.5);
  // }
  
  // .auth button:active {
  //   box-shadow: inset 0 0 12px 2px rgba(0, 0, 0, 0.5);
  // }
});