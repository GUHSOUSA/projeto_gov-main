import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, Image, Alert } from 'react-native';
import styles from './style'
import API_URL from './../../utils/url';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Form({ navigation }) {
    const [address, setAddress] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [familyMembers, setFamilyMembers] = useState('');
    const [familyIncome, setFamilyIncome] = useState('');
    const [monthlyExpenses, setMonthlyExpenses] = useState('');
    const [educationLevel, setEducationLevel] = useState('');
    const [jobLevel, setJobLevel] = useState('');
    const [healthStatus, setHealthStatus] = useState('');
    const [housingType, setHousingType] = useState('');
    const [transportAccess, setTransportAccess] = useState('');
    const [specialNeeds, setSpecialNeeds] = useState('');
    const [governmentSupport, setGovernmentSupport] = useState('');
    const [NGOSupport, setNGOSupport] = useState('');

    const handleIncomeChange = (value) => {
        const formattedValue = `R$ ${value.replace(/\D/g, "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
        setFamilyIncome(formattedValue);
    };

    const handleExpensesChange = (value) => {
        const formattedValue = `R$ ${value.replace(/\D/g, "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
        setMonthlyExpenses(formattedValue);
    };

    const handleSubmit = async () => {
        

        const formData = {
            address,
            maritalStatus,
            familyMembers,
            familyIncome,
            monthlyExpenses,
            educationLevel,
            jobLevel,
            healthStatus,
            housingType,
            transportAccess,
            specialNeeds,
            governmentSupport,
            NGOSupport
        };
        try {
            
            const id = await AsyncStorage.getItem('id');
            console.log(id)
            // aqui de novo vou dar um response pra enviar minha informação
            const response = await axios.put(`${API_URL}api/${id}`, formData, );
      
            if(response){
                Alert.alert('Formulário enviado com sucesso!', 'Você receberá um retorno no email cadastrado.');
                navigation.navigate('Download')
            }
          } catch (error) {
            
              Alert.alert('Erro', error.response.data.msg);
            
          }

    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/imagemgov.png')}
                />
                <Text style={styles.title}>
                    Formulário de Inscrição Para Pessoas Carentes
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Endereço Completo"
                    value={address}
                    onChangeText={setAddress}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Estado Civil"
                    value={maritalStatus}
                    onChangeText={setMaritalStatus}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Número de Membros da Família"
                    value={familyMembers}
                    onChangeText={setFamilyMembers}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Renda Familiar (Soma de todos os membros)"
                    value={familyIncome}
                    onChangeText={handleIncomeChange}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Despesas Mensais"
                    value={monthlyExpenses}
                    onChangeText={handleExpensesChange}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nível de Escolaridade"
                    value={educationLevel}
                    onChangeText={setEducationLevel}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ocupação de Trabalho"
                    value={jobLevel}
                    onChangeText={setJobLevel}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tem Doenças Crônicas? Se sim, quais?"
                    value={healthStatus}
                    onChangeText={setHealthStatus}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tipo de Moradia (Própria ou Aluguel)"
                    value={housingType}
                    onChangeText={setHousingType}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tem Veículo Próprio? Se sim, qual?)"
                    value={transportAccess}
                    onChangeText={setTransportAccess}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tem Necessidades Especiais? Se sim, qual?"
                    value={specialNeeds}
                    onChangeText={setSpecialNeeds}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Recebe Apoio Governamental? Se sim, qual?"
                    value={governmentSupport}
                    onChangeText={setGovernmentSupport}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Recebe Apoio de ONGs? Se sim, qual?"
                    value={NGOSupport}
                    onChangeText={setNGOSupport}
                />
                <Button title="Enviar" color="#108846" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
}

export default Form;