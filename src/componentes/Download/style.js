import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow'
    },
    logo: {
      width: 230,
      height: 110,
      alignSelf: 'center',
      marginBottom: 90,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(5, 138, 5, 0.9)',
      borderRadius: 100,
      width: 200,
      height: 200,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 18,
    },
  });

export default styles;