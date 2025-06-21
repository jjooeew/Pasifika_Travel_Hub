import React, {
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdTokenResult,                 // ★ NEW
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);           // ★ NEW
  // const [loading, setLoading] = useState(true);

  /* ────────────────────────────  auth helpers  ─────────────────────────── */

  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  /* ───────────────────────  watch login / logout  ─────────────────────── */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (!user) {
        setIsAdmin(false);                                 // ★ NEW
        return;
      }

      // pull down custom claims (forceRefresh true = always up-to-date)
      const { claims } = await getIdTokenResult(user, true); // ★ NEW
      setIsAdmin(claims.admin === true);                   // ★ NEW

      // setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* ─────────────────────────────  export  ─────────────────────────────── */

  const value = {
    currentUser,
    isAdmin,                                               // ★ NEW
    signUp,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
