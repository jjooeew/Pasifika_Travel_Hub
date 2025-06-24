import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import ScreenWrapper from '../layouts/ScreenWrapper';

const { width: screenWidth } = Dimensions.get('window');
const CARD_BG = '#F5E0C3';
const PRIMARY = '#0B5968';

export default function ProfilePage() {
  return (
    <ScreenWrapper>
      <View style={styles.card}>
        <Image
          source={require('../assets/images/react-logo.png')}
          style={styles.profileImage}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
        />
        <TextInput
          style={[styles.input, styles.inputSpacing]}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
        />
      </View>

      <Text style={styles.experiencesTitle}>My Experiences</Text>

      <View style={styles.experienceBox} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
    width: screenWidth * 0.9,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputSpacing: {
    marginTop: 12,
  },
  experiencesTitle: {
    fontFamily: 'ComingSoon',
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 16,
    color: PRIMARY,
  },
  experienceBox: {
    width: screenWidth * 0.9,
    height: 200,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginBottom: 24,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: '#8B4513', 
    borderRadius: 8,
  },
});
