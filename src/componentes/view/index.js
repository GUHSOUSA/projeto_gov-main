import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, TouchableOpacity, View } from 'react-native';
import API_URL from '../../utils/url';

const ViewAdm = () => {
 const [users, setUsers] = useState([]);

 useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
      }
    };

    getUsers();
 }, []);

 const handlePutAge = async (id, age) => {
    console.log(id, age)
  };

 return (
    <View>
      {users.map(user => (
        <View key={user.id} style={{
            
            flexDirection: "row"
        }}>
            <Text>{user.name}</Text>
            <Text> {user.rg}</Text>
            <TouchableOpacity onPress={() =>handlePutAge(user._id, user.age)}><Text style={{color: "green"}}> {user._id}</Text></TouchableOpacity>
            
            </View>
      ))}
    </View>
 );
};

export default ViewAdm;