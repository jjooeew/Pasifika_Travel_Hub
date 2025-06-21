import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/auth/me"); // {username,email,avatarUrl,...}
      setUser(data);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
