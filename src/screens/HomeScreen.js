import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import DollCard from '../components/DollCard';

const dolls = [
  {
    id: '1',
    nome: 'Boneca Draculaura',
    personagem: 'Draculaura',
    comprado: true,
    imagem: 'https://i.pinimg.com/736x/77/64/0d/77640d9c80d03c30a4423b8ae07dc66b.jpg'
  },
  {
    id: '2',
    nome: 'Boneca Frankie Stein',
    personagem: 'Frankie Stein',
    comprado: false,
    imagem: 'https://i.pinimg.com/736x/6b/58/e0/6b58e03dbb86e0e5a77fbcbe022f01ac.jpg'
  }
  // Adicione mais bonecas se quiser
];

export default function HomeScreen({ navigation }) {
  const compradas = dolls.filter(d => d.comprado).length;
  const total = dolls.length;

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.title}>Minhas Monstrinhas: {compradas} de {total}</Text>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${(compradas / total) * 100}%` }]} />
      </View>

      <FlatList
        data={dolls}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DollCard
            doll={item}
            onPressInfo={() => navigation.navigate('DollInfo', { doll: item })}
          />
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddDoll')}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>

      <Image
        source={require('../assets/personagens-footer.png')}
        style={styles.footerImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  title: { color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 10 },
  barBackground: {
    height: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 10
  },
  barFill: {
    height: '100%',
    backgroundColor: '#ff1493',
    borderRadius: 5
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20
  },
  addButton: {
    backgroundColor: '#ff1493',
    marginHorizontal: 50,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  addButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  footerImage: {
    width: '100%',
    height: 100
  }
});
