import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const logo = require('../assets/images/logo.png');

const colors = {
  primary: '#0B5968',
  white: '#fff',
};

export default function NavBar() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.navbar}>
        {/* ☰ Burger Menu */}
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>

        {/* 🏝️ Logo */}
        <TouchableOpacity onPress={() => router.push('/landing')} style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>

        {/* 👤 Profile Icon */}
        <TouchableOpacity onPress={() => router.push('/profile')} style={styles.profileContainer}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.primary,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
  },
  menuIcon: {
    fontSize: 28,
    color: colors.white,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
  },
  profileContainer: {
    paddingLeft: 10,
  },
  profileIcon: {
    fontSize: 28,
    color: colors.white,
  },
});
