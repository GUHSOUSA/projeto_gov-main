import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ffffff',
    },
    logo: {
      width: 230,
      height: 110,
      alignSelf: 'center',
      marginBottom: 90,
    },
    actionText: {
      fontSize: 18,
      color: '#108846',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 15, 
      borderRadius: 5,
    },
    input: {
      backgroundColor: '#e6e6e6',
      marginBottom: 10,
      borderRadius: 20,
      width: 410,
      height: 40,
      alignSelf: 'center',
      paddingLeft: 15,
    },
    button: {
      alignItems: 'center',
      padding: 10,
      borderRadius: 50,
      marginBottom: 5,
      width: 200,
      alignSelf: 'center',
      backgroundColor: '#108846',
    },
    button2: {
      alignItems: 'center',
      padding: 10,
      borderRadius: 50,
      marginBottom: 5,
      marginTop: 20,
      width: 200,
      alignSelf: 'center',
      backgroundColor: '#006bf7',
    },
    buttonText: {
      color: '#fff',
    },
  });

export default styles;