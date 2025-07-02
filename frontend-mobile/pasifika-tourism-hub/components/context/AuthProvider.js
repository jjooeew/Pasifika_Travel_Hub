import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "../../services/auth";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribe;

  const initAuth = async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    const auth = getFirebaseAuth();
    unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
  };

  initAuth();

  return () => {
    if (unsubscribe) unsubscribe();
  };
}, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}