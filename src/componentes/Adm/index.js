import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Vibration } from 'react-native';
import styles from './style'
import axios from 'axios';
import API_URL from '../../utils/url';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // Quando a tela perde o foco (o usuário sai da tela), limpa os campos
      setEmail('');
      setPassword('');
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Vibration.vibrate();
      Alert.alert('Erro', 'Por favor, preencha o email e a senha.');
      return;
    }
    const data = {
      
      email: email,
      password: password
    };
    try {

      // aqui de novo vou dar um response pra enviar minha informação
      const response = await axios.post(`${API_URL}api/signin`, data);

      if(response.status === 200){

        // vou pegar essas informaçoes que ele passou e vou verificar se ele e

        const admin = response.data.type

      if(admin === "admin"){

        navigation.navigate("View")

      }else{
        Alert.alert("Você nâo é administrador")
      }
      }
    } catch (error) {

      // se nao for ele captura o erro 
      

      if (error.response.status === 400) {
        Alert.alert('Erro', error.response.data.msg);
      } 
    }

    
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../assets/imagemgov.png')}
      />
      <Text style={styles.actionText}>REALIZAR LOGIN COMO ADMINISTRADOR</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#808080"
        value={email}
        onChangeText={setEmail}
        color="#000000"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#808080"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        color="#000000"
      />
      <View style={{ height: 20 }} />
      <TouchableOpacity 
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
