import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function DollCard({ doll, onPressInfo }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPressInfo} style={styles.infoIcon}>
        <Image source={require('../assets/info.png')} style={styles.iconImage} />
      </TouchableOpacity>

      <Image source={{ uri: doll.imagem }} style={styles.image} />

      <Text style={styles.name}>{doll.personagem}</Text>

      {doll.comprado && (
        <Image source={require('../assets/check.png')} style={styles.checkIcon} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 180,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    position: 'relative'
  },
  image: {
    width: 80,
    height: 100,
    marginBottom: 5,
    borderRadius: 5
  },
  name: {
    fontSize: 12,
    color: '#fff',
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
  checkIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 5,
    right: 5
  }
});
