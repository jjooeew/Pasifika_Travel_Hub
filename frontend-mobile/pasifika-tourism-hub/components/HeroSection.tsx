import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function HeroSection() {
  return (
    <View style={styles.hero}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.tagline}>Your gateway to paradise</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    width,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  tagline: {
    marginTop: 16,
    marginBottom: 40,
    fontFamily: 'GreatVibes',
    fontSize: 28,
    color: '#0B5968',
  },
});