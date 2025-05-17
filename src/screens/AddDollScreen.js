import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddDollScreen({ navigation }) {
  const [form, setForm] = useState({
    nome: '',
    url: '',
    personagem: '',
    linha: '',
    numeroSerie: '',
    ano: '',
    fabricante: '',
  });

  // Função para atualizar o form
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // Salvar os dados no AsyncStorage
  const handleSalvar = async () => {
    try {
      const dadosExistentes = await AsyncStorage.getItem('bonecas');
      let bonecas = dadosExistentes ? JSON.parse(dadosExistentes) : [];
      bonecas.push(form);
      await AsyncStorage.setItem('bonecas', JSON.stringify(bonecas));
      Alert.alert('Sucesso', 'Boneca cadastrada com sucesso!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
      console.error(error);
    }
  };

  const handleCancelar = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/header-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>MONSTERCOLLECTION</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome da Boneca:</Text>
        <TextInput style={styles.input} value={form.nome} onChangeText={text => handleChange('nome', text)} />

        <Text style={styles.label}>Imagem URL:</Text>
        <TextInput style={styles.input} value={form.url} onChangeText={text => handleChange('url', text)} />

        <Text style={styles.label}>Personagem:</Text>
        <TextInput style={styles.input} value={form.personagem} onChangeText={text => handleChange('personagem', text)} />

        <Text style={styles.label}>Linha/Coleção:</Text>
        <TextInput style={styles.input} value={form.linha} onChangeText={text => handleChange('linha', text)} />

        <Text style={styles.label}>Número de Série:</Text>
        <TextInput style={styles.input} value={form.numeroSerie} onChangeText={text => handleChange('numeroSerie', text)} />

        <Text style={styles.label}>Ano de Lançamento:</Text>
        <TextInput style={styles.input} value={form.ano} onChangeText={text => handleChange('ano', text)} />

        <Text style={styles.label}>Fabricante:</Text>
        <TextInput style={styles.input} value={form.fabricante} onChangeText={text => handleChange('fabricante', text)} />

        <TouchableOpacity style={styles.addButton} onPress={handleSalvar}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>

      <Image
        source={require('../assets/personagens-footer.png')}
        style={styles.footerImage}
        resizeMode="contain"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#ff1493',
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 16,
    marginBottom: 19,
    borderRadius: 10,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#3793db',
    paddingHorizontal: 16,
    paddingVertical: 52,
    width: '90%',
    marginVertical: 20,
  },
  label: {
    color: '#e5007e',
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#e5007e',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#cce5f7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '60%',
    marginBottom: 20,
  },
  cancelButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  footerImage: {
    width: '100%',
    height: 100,
    marginTop: 50,
  },
});
