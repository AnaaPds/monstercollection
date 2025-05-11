import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Header from '../components/Header';

export default function AddDollScreen({ route, navigation }) {
  const dollToEdit = route.params?.doll;

  const [nome, setNome] = useState(dollToEdit?.nome || '');
  const [personagem, setPersonagem] = useState(dollToEdit?.personagem || '');
  const [colecao, setColecao] = useState(dollToEdit?.colecao || '');
  const [numeroSerie, setNumeroSerie] = useState(dollToEdit?.numeroSerie || '');
  const [ano, setAno] = useState(dollToEdit?.ano || '');
  const [fabricante, setFabricante] = useState(dollToEdit?.fabricante || '');
  const [imagem, setImagem] = useState(dollToEdit?.imagem || '');

  const handleSave = () => {
    const novaBoneca = { nome, personagem, colecao, numeroSerie, ano, fabricante, imagem };
    console.log('Boneca salva:', novaBoneca);
    Alert.alert('Sucesso', 'Boneca salva com sucesso!');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text style={styles.title}>{dollToEdit ? 'Editar Boneca' : 'Adicionar Boneca'}</Text>

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Personagem" value={personagem} onChangeText={setPersonagem} style={styles.input} />
      <TextInput placeholder="Linha/Coleção" value={colecao} onChangeText={setColecao} style={styles.input} />
      <TextInput placeholder="Número de Série" value={numeroSerie} onChangeText={setNumeroSerie} style={styles.input} />
      <TextInput placeholder="Ano de Lançamento" value={ano} onChangeText={setAno} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Fabricante" value={fabricante} onChangeText={setFabricante} style={styles.input} />
      <TextInput placeholder="URL da Imagem" value={imagem} onChangeText={setImagem} style={styles.input} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffe4f2', padding: 20 },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff'
  },
  saveButton: {
    backgroundColor: '#ff1493',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  saveText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
