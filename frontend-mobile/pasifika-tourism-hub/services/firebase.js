import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCNbzsFuhyoFVf3kDpSto07zSZvvpwQWV4",
  authDomain: "pasifikahub-bbacc.firebaseapp.com",
  projectId: "pasifikahub-bbacc",
  storageBucket: "pasifikahub-bbacc.firebasestorage.app",
  messagingSenderId: "56624665996",
  appId: "1:56624665996:web:5058de85d3d2c4a6c532a9",
  measurementId: "G-W3XZHM2WD4"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const storage = getStorage(app);