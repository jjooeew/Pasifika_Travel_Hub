import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "../services/auth";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../src/types/navigation";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const handleLogin = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const auth = getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Landing");
    } catch (err) {
      Alert.alert("Login Error", (err as any).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
  link: { marginTop: 16, color: "blue", textAlign: "center" },
});
