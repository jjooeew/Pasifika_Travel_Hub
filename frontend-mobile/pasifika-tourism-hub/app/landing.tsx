import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import ScreenWrapper from '../layouts/ScreenWrapper';
import HeroSection from '../components/HeroSection';
import CountryCard, { Country } from '../components/CountryCard';

const countries: Country[] = [
  {
    name: 'Samoa',
    image: require('../assets/images/samoa.jpg'),
    flag: require('../assets/flags/sa.png'),
    href: '/samoa',
  },
  {
    name: 'Fiji',
    image: require('../assets/images/fiji.jpeg'),
    flag: require('../assets/flags/fi.png'),
    href: '/fiji',
  },
  {
    name: 'Tonga',
    image: require('../assets/images/tonga.jpg'),
    flag: require('../assets/flags/to.png'),
    href: '/tonga',
  },
];

export default function LandingPage() {
  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <HeroSection />
        <View style={styles.cardsContainer}>
          {countries.map((country) => (
            <CountryCard key={country.name} {...country} />
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
