import React, { useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity, Text } from 'react-native';
import styles from './style'

function Home ({ navigation }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000); // Navega para a página de login após 2 segundos

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 3000); // Mostra o botão após 3 segundos

    return () => {
      clearTimeout(timer); // Limpa o timer se o componente for desmontado antes do tempo acabar
      clearTimeout(buttonTimer); // Limpa o timer do botão
    }
  }, [navigation]);

  return (
    <ImageBackground source={require('../../../assets/imagempessoas.png')} style={styles.container}>
      {showButton && (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
}

export default Home;