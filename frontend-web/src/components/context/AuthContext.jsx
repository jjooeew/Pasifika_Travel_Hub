// components/context/AuthContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo
} from "react";
import { auth, db } from "../../firebase";           // make sure db is exported
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getIdTokenResult,
  updateProfile,
  onIdTokenChanged,                                     // NEW
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";    // NEW


export const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin]         = useState(false);
  const [loading, setLoading]         = useState(true);

// helpers

  const signUp = async (email, password, username) => {
    // create Auth account
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // save the display name on the auth user
    await updateProfile(cred.user, { displayName: username });

    // create the Firestore user doc (adjust fields to taste)
    await setDoc(doc(db, "users", cred.user.uid), {
      username,
      avatarUrl: "", 
      likedActivities: [],
    });
  };

  const login  = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const refreshClaims = async () => {
    if (!auth.currentUser) return null;
    const res = await getIdTokenResult(auth.currentUser, true);
    setIsAdmin(!!res.claims.admin);
    return res;
  }

  const getIdToken = async () => {
    if (!auth.currentUser) return null;
    return auth.currentUser.getIdToken();
  }

  /* ─────────── watch login / logout ─────────── */

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setCurrentUser(user);

      if (!user) {
        setIsAdmin(false);
        setLoading(false)
        return;
      }

      // pull custom claims once per login
      try {
      const { claims } = await getIdTokenResult(user, true);
        setIsAdmin(!!claims.admin)
      } finally {
        setLoading(false)
      }
    });

    return () => unsubscribe();
  }, []);

  /* ─────────── provider value ─────────── */

  const value = useMemo(
    () => ({
    currentUser,
    isAdmin,
    loading,
    signUp,
    login,
    logout,
    refreshClaims,
    getIdToken,
  }),
  [currentUser, isAdmin, loading]
); 

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
