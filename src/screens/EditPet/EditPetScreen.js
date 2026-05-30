import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import Header from '../../components/Header/Header';
import Input from '../../components/Input';
import CustomButton from '../../components/Button';
import { colors } from '../../theme/colors';
import { usePet } from '../../context/PetContext';

export default function EditPetScreen({ route, navigation }) {
  const { petIndex, petData } = route.params;
  const [name, setName] = useState(petData.name || '');
  const [breed, setBreed] = useState(petData.breed || '');
  const [age, setAge] = useState(petData.age?.toString() || '');

  const { updatePet } = usePet();

  const handleSubmit = () => {
    const updatedPet = { name, breed, age };
    updatePet(petIndex, updatedPet);
    Alert.alert('Pet atualizado', `Nome: ${name}\nRaça: ${breed}\nIdade: ${age}`);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Header title="Editar Pet" />
      <View style={styles.form}>
        <Input label="Nome" placeholder="Nome do pet" value={name} onChangeText={setName} />
        <Input label="Raça" placeholder="Raça do pet" value={breed} onChangeText={setBreed} />
        <Input label="Idade" placeholder="Idade do pet" value={age} onChangeText={setAge} keyboardType="numeric" />
        <CustomButton title="Salvar" onPress={handleSubmit} type="primary" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  form: {
    padding: 16,
  },
});
