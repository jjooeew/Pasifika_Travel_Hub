import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";          // <<– existing file
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const { currentUser } = useContext(AuthContext);   // <- get UID & email
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!currentUser) { setUser(null); return; }

    (async () => {
      const snap = await getDoc(doc(db, "users", currentUser.uid));
      setUser({
        uid: currentUser.uid,
        email: currentUser.email,
        avatarUrl: currentUser.photoURL,   // set by your upload
        ...snap.data(),                    // username, displayName …
      });
    })();
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}