import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../src/types/navigation";
import { useAuth } from "./context/useAuth";
import { getFirebaseAuth } from "../services/auth";
import { signOut } from "firebase/auth";

type Props = {
  closeMenu: () => void;
};

export default function UserDropdown({ closeMenu }: Props) {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { user } = useAuth();

  const handleLogout = async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
    closeMenu();
    navigation.navigate("Landing");
  };

  return (
    <View style={styles.dropdown}>
      {user ? (
        <>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              closeMenu();
              navigation.navigate("Profile");
            }}
          >
            <Text>View Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              closeMenu();
              navigation.navigate("Login");
            }}
          >
            <Text>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              closeMenu();
              navigation.navigate("Signup");
            }}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
