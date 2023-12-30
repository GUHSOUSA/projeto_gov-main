import React, { useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity, Text, Alert } from 'react-native';
import styles from './style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from './../../utils/url'

function Home ({ navigation }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {

      // vou recuper o token que eu guardei quando fiz login

      


      const token = await AsyncStorage.getItem('token');


      // se for a primeira vez que entro não vou ter
      // o token então vou navegar para login

      if(!token){
        navigation.navigate("Login")
      }

      // agora se tiver token eu vou pesquisar na minha api
      // se esse token e valido, confere na pasta api/routes/auth

      const response = await axios.get(`${API_URL}`, {
        headers: {
          'x-auth-token': token
        }
      });

      // o token pode inspirar então se eu não conseguir 
      // obter o usuario com esse token e pq ele ja era e eu 
      // preciso fazer login de novo

      // entâo vou remover ele do meu asyncstorage
      // e navegar para login

      if(!response){
        await AsyncStorage.removeItem('token');
        navigation.navigate("Login")
      }

      // mas se o token for valido ele vai me retornar todas as informaçoes do usuario
      // eu vou pegar a informação onde esta o type
      // ja que eu tenho usuario e admin
      // e vou verificar, se o type for igual admin
      // quero que navegue ate admin
      // se nao navege ate Download ou formulario se assim você quiser, ou um meio termo

      

      if(response.data.type === "admin"){
        navigation.navigate("View")
      }else{
        await AsyncStorage.setItem("id", response.data._id)
        console.log(response.data._id)
        navigation.navigate("Download")
        console.log(response.data.rg)
      }
    
    
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