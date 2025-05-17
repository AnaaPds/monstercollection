import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [bonecas, setBonecas] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    if (isFocused) {
      carregarBonecas();
    }
  }, [isFocused]);

  const carregarBonecas = async () => {
    const dados = await AsyncStorage.getItem('bonecas');
    if (dados) {
      setBonecas(JSON.parse(dados));
    }
  };

  const salvarBonecas = async (novasBonecas) => {
    await AsyncStorage.setItem('bonecas', JSON.stringify(novasBonecas));
    setBonecas(novasBonecas);
  };

  const toggleComprado = async (index) => {
    const novasBonecas = [...bonecas];
    novasBonecas[index].comprado = !novasBonecas[index].comprado;
    salvarBonecas(novasBonecas);
  };

  const atualizarBoneca = (bonecaAtualizada) => {
    const novasBonecas = bonecas.map(b =>
      b.numeroSerie === bonecaAtualizada.numeroSerie ? bonecaAtualizada : b
    );
    salvarBonecas(novasBonecas);
  };

  const excluirBoneca = (numeroSerie) => {
    const novasBonecas = bonecas.filter(b => b.numeroSerie !== numeroSerie);
    salvarBonecas(novasBonecas);
  };

  const bonecasFiltradas = bonecas.filter(b =>
    b.personagem.toLowerCase().includes(busca.toLowerCase())
  );

  const progresso = bonecas.length === 0
    ? 0
    : bonecas.filter(b => b.comprado).length / bonecas.length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.header}>
        <Image source={require('../assets/header-logo.png')} style={styles.logo} />
        <Text style={styles.titulo}>MONSTERCOLLECTION</Text>
      </View>

      <TextInput
        placeholder="Buscar boneca..."
        placeholderTextColor="#aaa"
        style={styles.input}
        value={busca}
        onChangeText={setBusca}
      />

      <View style={styles.barraContainer}>
        <View style={[styles.barraProgresso, { width: `${progresso * 100}%` }]} />
      </View>
      <Text style={styles.textoProgresso}>
        {Math.round(progresso * 100)}% da coleção comprada
      </Text>

      {bonecasFiltradas.length > 0 ? (
        <FlatList
          data={bonecasFiltradas}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.lista}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.card,
                item.comprado ? styles.cardComprado : null
              ]}
            >
              <TouchableOpacity
                style={styles.infoIcon}
                onPress={() => navigation.navigate('DollInfo', {
                  doll: item,
                  onUpdate: atualizarBoneca,
                  onDelete: excluirBoneca
                })}
              >
                <Image source={require('../assets/info.png')} style={styles.iconImage} />
              </TouchableOpacity>

              <Image source={{ uri: item.url }} style={styles.image} />
              <Text style={styles.name}>{item.personagem}</Text>

              <TouchableOpacity
                style={styles.checkIconTouchable}
                onPress={() => toggleComprado(index)}
              >
                {item.comprado ? (
                  <Image
                    source={require('../assets/check.png')}
                    style={styles.checkIcon}
                  />
                ) : (
                  <View style={styles.checkIconInativo} />
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.semBonecas}>Nenhuma boneca adicionada ainda.</Text>
      )}

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('AddDoll')}
      >
        <Text style={styles.textoBotao}>Adicionar</Text>
      </TouchableOpacity>

      <Image
        source={require('../assets/personagens-footer.png')}
        style={styles.imagemPersonagens}
        resizeMode="contain"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 3
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#ff1493',
    paddingVertical: 30,
    paddingHorizontal: 16,
    marginBottom: 19,
    borderRadius: 10
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 5
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  input: {
    width: '80%',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 15,
    borderColor: '#ff1493',
    borderWidth: 1,
    alignSelf: 'center',
  },
  lista: {
    alignItems: 'center'
  },
  card: {
    width: 150,
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    position: 'relative'
  },
  cardComprado: {
    borderWidth: 2,
    borderColor: '#ff1493',
  },
  image: {
    width: 60,
    height: 100,
    marginBottom: 5,
    borderRadius: 5
  },
  name: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginTop: 5
  },
  iconImage: {
    width: 20,
    height: 20
  },
  infoIcon: {
    position: 'absolute',
    top: 5,
    left: 5
  },
  checkIconTouchable: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: 20,
    height: 20,
  },
  checkIconInativo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#666',
  },
  botaoAdicionar: {
    width: '60%',
    backgroundColor: '#ff1493',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    alignSelf: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold'
  },
  barraContainer: {
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    marginTop: 20,
    overflow: 'hidden'
  },
  barraProgresso: {
    height: 10,
    backgroundColor: '#ff1493'
  },
  textoProgresso: {
    color: '#fff',
    marginTop: 5,
    textAlign: 'center'
  },
  imagemPersonagens: {
    width: '100%',
    height: 120,
    marginTop: 400
  },
  semBonecas: {
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 20
  }
});
