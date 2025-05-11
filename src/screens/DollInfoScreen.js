import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import zipper from '../assets/zipper.png';
import bonecas from '../assets/personagens-footer.png';

export default function DollInfoScreen({ route, navigation }) {
  const { doll } = route.params;

  const handleDelete = () => {
    Alert.alert('Confirmação', 'Tem certeza que deseja excluir esta boneca?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Header />
      <Image source={zipper} style={styles.zipper} />

      <View style={styles.box}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>

        <Image source={{ uri: doll.imagem }} style={styles.dollImage} />

        <Text style={styles.label}>Nome: {doll.nome || '—'}</Text>
        <Text style={styles.label}>Personagem: {doll.personagem || '—'}</Text>
        <Text style={styles.label}>Linha/Coleção: {doll.colecao || '—'}</Text>
        <Text style={styles.label}>Número de Série: {doll.numeroSerie || '—'}</Text>
        <Text style={styles.label}>Ano de Lançamento: {doll.ano || '—'}</Text>
        <Text style={styles.label}>Fabricante: {doll.fabricante || '—'}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('AddDoll', { doll })}>
            <Text style={styles.btnText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.btnText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image source={bonecas} style={styles.bottomImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffe4f2' },
  zipper: { width: '100%', height: 60, resizeMode: 'contain', marginBottom: 10 },
  box: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    position: 'relative'
  },
  closeBtn: { position: 'absolute', top: 10, right: 10 },
  closeText: { fontSize: 20, color: 'red' },
  dollImage: { width: 100, height: 100, alignSelf: 'center', marginVertical: 10 },
  label: { fontSize: 14, marginVertical: 3 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 },
  editBtn: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 8 },
  deleteBtn: { backgroundColor: '#f44336', padding: 10, borderRadius: 8 },
  btnText: { color: 'white', fontWeight: 'bold' },
  bottomImage: { width: '100%', height: 100, resizeMode: 'contain', marginTop: 20 }
});
