import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerParamList } from "../src/types/navigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import UserDropdown from "./UserDropdown";

const logo = require("../assets/images/logo.png");

const colors = {
  primary: "#0B5968",
  white: "#fff",
};

export default function NavBar() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.navbar}>
        {/* ☰ Burger Menu */}
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>

        {/* 🏝️ Logo */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Landing")}
          style={styles.logoContainer}
        >
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>

        {/* 👤 Profile Icon */}
        <TouchableOpacity
          onPress={() => setMenuVisible(!menuVisible)}
          style={styles.profileContainer}
        >
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>

        {/* Dropdown Menu */}
        {menuVisible && (
          <UserDropdown closeMenu={() => setMenuVisible(false)} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.primary,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    alignItems: "center",
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
  dropdown: {
    position: "absolute",
    top: 40,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 4,
  },
  menuItem: {
    padding: 8,
  },
});
