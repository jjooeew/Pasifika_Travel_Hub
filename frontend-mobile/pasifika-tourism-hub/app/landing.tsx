import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import ScreenWrapper from '../layouts/ScreenWrapper';
import HeroSection from '../components/HeroSection';
import CountryCard from '../components/CountryCard';



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
