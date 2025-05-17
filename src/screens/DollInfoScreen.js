import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DollInfoScreen({ route }) {
  const { doll, onUpdate, onDelete } = route.params; // Receber callbacks da tela anterior
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDoll, setEditedDoll] = useState({ ...doll });

  const handleDelete = () => {
    Alert.alert(
      'Tem certeza que deseja excluir?',
      '',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => {
            if (onDelete) onDelete(doll.numeroSerie); // CORRIGIDO AQUI
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onUpdate) onUpdate(editedDoll);
    setIsEditing(false);
    navigation.goBack();
  };

  const renderField = (label, key) => (
    <>
      <Text style={styles.label}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editedDoll[key]}
          onChangeText={(text) => setEditedDoll({ ...editedDoll, [key]: text })}
        />
      ) : (
        <Text style={styles.value}>{doll[key]}</Text>
      )}
    </>
  );

  if (!doll) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>Erro: boneca não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image
          source={require('../assets/header-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>MONSTERCOLLECTION</Text>
      </View>

      <View style={styles.modal}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        <Image source={{ uri: editedDoll.url }} style={styles.image} />

        {renderField('Nome da Boneca:', 'nome')}
        {renderField('Imagem URL:', 'url')}
        {renderField('Personagem:', 'personagem')}
        {renderField('Linha/Coleção:', 'linha')}
        {renderField('Número de Série:', 'numeroSerie')}
        {renderField('Ano de Lançamento:', 'ano')}
        {renderField('Fabricante:', 'fabricante')}

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image
        source={require('../assets/personagens-footer.png')}
        style={styles.footerImage}
        resizeMode="contain"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#000',
    alignItems: 'center',
    paddingBottom: 100,
    paddingTop: 180,
  },
  header: {
    paddingTop: 40,
    backgroundColor: '#e6007e',
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
  },
  logo: {
    width: 60,
    height: 50,
    marginBottom: 2,
    borderRadius: 10
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    borderWidth: 2,
    borderColor: '#00aaff',
    alignItems: 'center',
    position: 'relative',
    marginTop: 20
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  closeText: {
    fontSize: 24,
    color: '#00aaff'
  },
  image: {
    width: 100,
    height: 180,
    marginBottom: 15,
    resizeMode: 'contain'
  },
  label: {
    fontWeight: 'bold',
    color: '#ff1493',
    alignSelf: 'flex-start',
    marginTop: 5
  },
  value: {
    color: '#000',
    marginBottom: 5,
    alignSelf: 'flex-start'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignSelf: 'stretch',
    marginBottom: 5,
    color: '#000'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20
  },
  button: {
    backgroundColor: '#e6f0ff',
    borderWidth: 1,
    borderColor: '#00aaff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold'
  },
  footerImage: {
    width: '100%',
    height: 120,
    marginTop: 40
  }
});
