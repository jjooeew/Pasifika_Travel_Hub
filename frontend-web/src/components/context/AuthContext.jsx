import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdTokenResult,
} from "firebase/auth";

/* --------------------------------------------------- */
/* 1️⃣  RAW CONTEXT – export it in case anyone needs it */
export const AuthContext = createContext(null);
/* --------------------------------------------------- */

/* 2️⃣  Small helper hook (what the rest of the app calls) */
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin]         = useState(false);

  /* ─────────── auth helpers ─────────── */

  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login  = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  /* ─────────── watch login / logout ─────────── */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (!user) {
        setIsAdmin(false);
        return;
      }

      /* pull custom claims once per login */
      const { claims } = await getIdTokenResult(user, true);
      setIsAdmin(claims.admin === true);
    });

    return () => unsubscribe();
  }, []);

  /* ─────────── provider value ─────────── */

  const value = {
    currentUser,
    isAdmin,
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
