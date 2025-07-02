// navigation/DrawerNavigator.tsx
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LandingPage from "../app/landing";
import ProfilePage from "../app/profile";
import ThingsToDoPage from "../app/things";
import LanguagePage from "../app/language";
import HistoryPage from "../app/history";
import KidsPage from "../app/kids";
import LoginScreen from "../app/login";
import SignupScreen from "../app/signup";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Landing" component={LandingPage} />
      <Drawer.Screen name="Profile" component={ProfilePage} />
      <Drawer.Screen name="ThingsToDo" component={ThingsToDoPage} />
      <Drawer.Screen name="Language" component={LanguagePage} />
      <Drawer.Screen name="History" component={HistoryPage} />
      <Drawer.Screen name="Kids" component={KidsPage} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Signup" component={SignupScreen} />
    </Drawer.Navigator>
  );
}
