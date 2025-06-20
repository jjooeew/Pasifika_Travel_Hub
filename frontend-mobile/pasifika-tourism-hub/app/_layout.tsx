import React from 'react';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <Drawer screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="landing"    options={{ title: 'Home' }} />
      <Drawer.Screen name="profile"    options={{ title: 'Profile' }} />
      <Drawer.Screen name="things"     options={{ title: 'Things to Do' }} />
      <Drawer.Screen name="language"   options={{ title: 'Language' }} />
      <Drawer.Screen name="history"    options={{ title: 'History' }} />
      <Drawer.Screen name="kids"       options={{ title: 'Kids' }} />
    </Drawer>
  );
}
