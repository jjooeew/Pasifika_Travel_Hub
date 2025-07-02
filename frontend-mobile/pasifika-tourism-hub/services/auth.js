import { getAuth } from "firebase/auth";
import { app } from "./firebase";

export const getFirebaseAuth = () => getAuth(app);