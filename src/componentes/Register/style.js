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
      backgroundColor: '#ffffff',
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
      color: '#000000',
      paddingLeft: 15,
    },
    label: {
      fontSize: 16,
      marginBottom: 10,
    },
    radioButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    radioButton: {
      height: 20,
      width: 20,
      backgroundColor: '#FFF',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#000',
      marginRight: 10,
    },
    radioButtonChecked: {
      backgroundColor: '#108846',
    },
    radioButtonLabel: {
      fontSize: 14,
      color: '#000',
    },
    selector: {
      backgroundColor: '#ffffff',
      borderRadius: 20,
      width: 410,
      height: 40,
      alignSelf: 'center',
      justifyContent: 'center',
      padding: 10,
      marginBottom: 10,
    },
    button: {
      alignItems: 'center',
      padding: 10,
      borderRadius: 50,
      marginBottom: 5,
      width: 150,
      alignSelf: 'center',
      backgroundColor: '#108846',
    },
    buttonText: {
      color: '#fff',
    },
    selector: {
      backgroundColor: '#e6e6e6',
      borderRadius: 20,
      width: 410,
      height: 40,
      alignSelf: 'center',
      justifyContent: 'center',
      padding: 10,
      marginBottom: 10,
    },
    selectorText: {
      color: '#000',
      fontSize: 14,
      textAlign: 'left',
    },
  });

export default styles;