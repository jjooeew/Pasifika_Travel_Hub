import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {   apiKey: "AIzaSyCNbzsFuhyoFVf3kDpSto07zSZvvpwQWV4",   authDomain: "pasifikahub-bbacc.firebaseapp.com",   projectId: "pasifikahub-bbacc",   storageBucket: "pasifikahub-bbacc.firebasestorage.app",   messagingSenderId: "56624665996",   appId: "1:56624665996:web:5058de85d3d2c4a6c532a9",   measurementId: "G-W3XZHM2WD4" };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
export const storage = getStorage(app);
