import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const pattern1 = require('../assets/images/pattern1.png');
const palm = require('../assets/images/palm.png');

const ScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <Image source={pattern1} style={styles.leftPattern} resizeMode="repeat" />
      <Image source={palm} style={styles.palmImage} resizeMode="contain" />

      <NavBar />

      <View style={styles.content}>
        {children}
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efe9df',
  },
  leftPattern: {
    position: 'absolute',
    top: screenHeight * 0, 
    left: 0,
    width: screenWidth * 0.5, 
    height: screenHeight * 10,
    resizeMode: 'contain',
    opacity: 10, 
  },
  palmImage: {
    position: 'absolute',
    top: 80, 
    right: 0,
    width: screenWidth * 0.5,
    height: screenHeight * 0.35,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    zIndex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
  },
});

export default ScreenWrapper;

