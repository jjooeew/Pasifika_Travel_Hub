import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import * as Speech from 'expo-speech';
import ScreenWrapper from '../layouts/ScreenWrapper';

const phraseData: Record<string, { text: string; translation: string }[]> = {
  samoa: [
    { text: 'Talofa lava', translation: 'Hello, greetings' },
    { text: 'O a mai oe?', translation: 'How are you?' },
    { text: 'Manuia le aso', translation: 'Have a good day' },
    { text: 'Fa’afetai tele', translation: 'Thank you very much' },
  ],
  fiji: [
    { text: 'Bula', translation: 'Hello' },
    { text: 'Vakacava tiko?', translation: 'How are you?' },
    { text: 'Moce mada', translation: 'Goodbye' },
    { text: 'Vinaka vaka levu', translation: 'Thank you very much' },
  ],
  tonga: [
    { text: 'Mālō e lelei', translation: 'Hello' },
    { text: 'Fēfē hake?', translation: 'How are you?' },
    { text: 'Nofo ā', translation: 'Stay well' },
    { text: 'Mālō aupito', translation: 'Many thanks' },
  ],
};

const countries = [
  { slug: 'samoa', name: 'Samoa', flag: require('../assets/flags/sa.png') },
  { slug: 'fiji',  name: 'Fiji',  flag: require('../assets/flags/fi.png') },
  { slug: 'tonga', name: 'Tonga', flag: require('../assets/flags/to.png') },
];

const { width: screenWidth } = Dimensions.get('window');

export default function LanguagePage() {
  const [selectedSlug, setSelectedSlug] = useState('samoa');
  const heading = countries.find(c => c.slug === selectedSlug)?.name || '';

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.flagContainer}>
          {countries.map((country) => (
            <TouchableOpacity
              key={country.slug}
              style={[
                styles.flagWrapper,
                selectedSlug === country.slug && styles.flagActive,
              ]}
              onPress={() => setSelectedSlug(country.slug)}
            >
              <Image source={country.flag} style={styles.flagImage} />
              <Text style={styles.flagLabel}>{country.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>{heading} - Useful Phrases</Text>
          {phraseData[selectedSlug].map(({ text, translation }, index) => (
            <View key={index} style={styles.phraseLine}>
              <View style={styles.phraseTextContainer}>
                <Text style={styles.phraseText}>{text}</Text>
                <Text style={styles.translationText}>{translation}</Text>
              </View>
              <TouchableOpacity
                onPress={() => Speech.speak(text, { language: 'en-US' })}
                accessibilityLabel="Play audio"
              >
                <Text style={styles.ttsIcon}>🔊</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  flagContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
    paddingHorizontal: 16,
  },
  flagWrapper: {
    alignItems: 'center',
    marginHorizontal: 30,  
    opacity: 0.6,
  },
  flagActive: {
    opacity: 1,
  },
  flagImage: {
    width: 48,
    height: 32,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  flagLabel: {
    fontSize: 12,
    color: '#333',
  },
  card: {
    backgroundColor: '#a5d6b4',
    width: screenWidth * 0.9,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heading: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  phraseLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  phraseTextContainer: {
    flex: 1,
  },
  phraseText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
  },
  translationText: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  ttsIcon: {
    fontSize: 18,
    marginLeft: 8,
  },
});

