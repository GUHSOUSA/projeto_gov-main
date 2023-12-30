import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import styles from './style'
import * as FileSystem from 'expo-file-system';
import API_URL from '../../utils/url';
import { shareAsync } from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const handleButtonPress = async () => {
  const email = await AsyncStorage.getItem('email');
  console.log(email)
  // aqui de novo vou dar um response pra enviar minha informação
  const gerarpdf = await axios.post(`${API_URL}generate-pdf`, {email}, );
  if(gerarpdf){
    const filename = "cadastro.pdf";
    const response = await fetch(`${API_URL}download`,);
    const { uri } = await FileSystem.downloadAsync(
      response.url,
      FileSystem.documentDirectory + filename
    );

    console.log('File downloaded to:', uri);
    save(uri)
  }else{
    Alert.alert("pdf nao gerado")
  }
}
  const save = (uri) =>  {
    shareAsync(uri);
  }
function Download({ navigation }) {
  

  return ( 
    <ImageBackground style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../assets/imagemgov.png')}
      />
      <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={handleButtonPress}> 
        <Text style={styles.buttonText}>BAIXAR FORMULÁRIO</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

export default Download;