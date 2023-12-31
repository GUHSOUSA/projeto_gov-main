import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import API_URL from '../../utils/url';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchData = async () => {
 try {
    const response = await fetch(`${API_URL}users`);
    const data = await response.json();
    console.log(data)
    return data;
 } catch (error) {
    console.error(error);
 }
};

const ViewAdmin = ({navigation}) => {
 const [users, setUsers] = useState([]);
 const [searchText, setSearchText] = React.useState('');
 const [updateId, setUpdateId] = useState('');
 const [isAccepted, setIsAccepted] = useState(false);

 useEffect(() => {
    fetchData().then(data => setUsers(data));
 }, []);
 useEffect(() => {
  if (updateId) {
    handleUpdate(updateId, isAccepted);
  }
}, [updateId, isAccepted]);
 const filterUsers = (searchText) => {
  console.log(searchText)
   setUsers(users.filter(user => user.name && user.name.includes(searchText)));
   
 };

 const handleUpdate = async (id, isAccepted) => {
  
  const token = await AsyncStorage.getItem('token')
  console.log(isAccepted)
  const userdata = {
    status: isAccepted
  }
   
     const response = await axios.put(`${API_URL}users/${id}`,
      userdata,
      { 
        headers: {
      'x-auth-token': token
  }});

     if(response.status === 200){
      
           const response = await fetch(`${API_URL}users`);
           if(response){

            fetchData().then(data => setUsers(data));
           }
       
     }else{
      console.log("erro")
     }
   
  
 };
 const handleAccept = (id) => {
  setIsAccepted('aceito');
  setUpdateId(id);
};
const navigateToDetails = (user) => {
  navigation.navigate('Datails', { user });
 };

 return (
    <View >
      <TextInput
        value={searchText}
        onChangeText={text => setSearchText(text)}
        placeholder="Pesquisar usuário"
      />
      <Button title="Filtrar" onPress={() => filterUsers(searchText)} />
      
      <View>
 {users.map(user => (
    <View key={user._id} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: "row", justifyContent: 'space-between' }}>
      
      <TouchableOpacity onPress={()=> navigateToDetails(user)}>
      <Text>ID: {user._id}</Text>
      <Text>Nome: {user.name}</Text>
      <Text>Idade: {user.age}</Text>
      </TouchableOpacity>
      <View style={{ borderRadius: 10, backgroundColor: 'blue', justifyContent: 'center'}}>
        <Button title={ user.status === "pendente" ? "Aceitar" : "aceito"} onPress={() => handleAccept(user._id)} />
      </View>

    </View>
  ))}
</View>
    </View>
 );
};

export default ViewAdmin;