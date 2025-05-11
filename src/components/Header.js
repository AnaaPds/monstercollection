import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import zipper from '../assets/zipper.png';
import logo from '../assets/header-logo.png';

export default function Header() {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>MONSTERCOLLECTION</Text>
      <Image source={zipper} style={styles.zipper} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', backgroundColor: '#ff1493', padding: 10 },
  logo: { width: 40, height: 40 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  zipper: { width: 150, height: 80, resizeMode: 'contain' },
});
