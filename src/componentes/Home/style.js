import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlayImage: {
      width: 300,
      height: 150,
      marginBottom: 20,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(5, 138, 5, 0.9)',
      padding: 10,
      marginTop: 0,
      borderRadius: 100, // Faz o botão redondo
      width: 120, // Define a largura do botão
      height: 120, // Define a altura do botão
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 20,
    },
  });

export default styles;