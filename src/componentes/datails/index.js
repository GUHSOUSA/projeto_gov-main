import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Details = ({navigation}) => {
 const route = useRoute();
 const { user } = route.params;

 return (
    <View>
      <Text>ID: {user._id}</Text>
      <Text>Nome: {user.name}</Text>
      <Text>Idade: {user.age}</Text>
      <Text>genero: {user.gender}</Text>
      <Text>rg: {user.rg}</Text>
      <Text>email: {user.email}</Text>
      <Text>addres: {user.address}</Text>
      <Text>estado civil: {user.maritalStatus}</Text>
      <Text>gastos: {user.monthlyExpenses}</Text>
      <Text>educaçao: {user.educationLevel}</Text>
      <Text>tranporte: {user.transportAccess}</Text>
      <Text>especial: {user.specialNeeds}</Text>


      <Text>renda familiar: {user.familyIncome}</Text>
      <Text>menbros: {user.familyMembers}</Text>
      <Text>suporte governo: {user.governmentSupport}</Text>
      <Text>saude: {user.healthStatus}</Text>
      <Text>casa: {user.housingType}</Text>
      <Text>emprego: {user.jobLevel}</Text>
      <Text>ajuda ong: {user.NGOSupport}</Text>
      <Text>Idade: {user.age}</Text>
      <Text>status: {user.status}</Text>

    </View>
 );
};

export default Details;