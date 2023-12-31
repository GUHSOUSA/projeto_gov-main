import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style'
import axios from 'axios'
import API_URL from './../../utils/url';

const GenderRadioButton = ({ label, value, checked, setChecked, onClose }) => {
  return (
    <TouchableOpacity
      style={styles.radioButtonContainer}
      onPress={() => { setChecked(value), onClose() }}
    >
      <View style={[styles.radioButton,
      checked === value ? styles.radioButtonChecked : null
      ]} />
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const GenderSelector = ({ gender, onPress }) => {
  let displayLabel = 'Selecione o gênero';
  if (gender === 'masculino') displayLabel = 'Masculino';
  else if (gender === 'feminino') displayLabel = 'Feminino';
  else if (gender === 'outro') displayLabel = 'Outro';
  else if (gender === 'não informar') displayLabel = 'Prefiro não dizer';

  return (
    <TouchableOpacity style={styles.selector} onPress={onPress}>
      <Text style={styles.selectorText}>{displayLabel}</Text>
    </TouchableOpacity>
  );
};

function Register({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [identification, setIdentification] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isGenderPickerVisible, setIsGenderPickerVisible] = useState(false);

  const handleRegister = async () => {
    if (!name || !gender || !age || !identification || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (parseInt(age) < 18) {
      Alert.alert('Erro', 'Você deve ter pelo menos 18 anos para se registrar');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (!passwordRegex.test(password)) {
      Alert.alert('Erro', 'A senha deve conter pelo menos uma letra maiúscula, um número e um símbolo');
      return;
    }

    const userData = {
      name: name,
      age: age,
      gender: gender,
      rg: identification,
      email: email,
      password: password
    };

    // aqui e a mesma coisa que no login
      try {
        const response = await axios.post(`${API_URL}api/signup`, userData);
  
        if(response.status === 200){
          console.log(response.data)
          Alert.alert(
            'Cadastro Concluído com Sucesso',
            'Por favor, faça login para continuar e preencher sua ficha socioeconômica.'
          );
          
          navigation.navigate('Login');
        }
      } catch (error) {
        if (error.response.status === 400) {
          Alert.alert('Erro', error.response.data.msg);
        } 
      }



  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../assets/imagemgov.png')}
      />
      <Text style={styles.actionText}>REGISTRAR NOVO USUÁRIO</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <GenderSelector
        gender={gender}
        onPress={() => setIsGenderPickerVisible(!isGenderPickerVisible)}
      />

      {isGenderPickerVisible && (
        <View style={styles.radioGroup}>
          <GenderRadioButton
            label="Masculino"
            value="masculino"
            checked={gender}
            setChecked={setGender}
            onClose={() => setIsGenderPickerVisible(false)}
          />
          <GenderRadioButton
            label="Feminino"
            value="feminino"
            checked={gender}
            setChecked={setGender}
            onClose={() => setIsGenderPickerVisible(false)}
          />
          <GenderRadioButton
            label="Outro"
            value="outro"
            checked={gender}
            setChecked={setGender}
            onClose={() => setIsGenderPickerVisible(false)}
          />
          <GenderRadioButton
            label="Prefiro não dizer"
            value="não informar"
            checked={gender}
            setChecked={setGender}
            onClose={() => setIsGenderPickerVisible(false)}
          />
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Identidade - RG"
        value={identification}
        onChangeText={setIdentification}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={{ height: 20 }} />
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: '#108846' }}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Register;
