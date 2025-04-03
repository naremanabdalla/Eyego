import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6EA7Nj7vQnKbO3p9bafC001wkrB3b0xU",
  authDomain: "eyego-89b67.firebaseapp.com",
  databaseURL: "https://eyego-89b67-default-rtdb.firebaseio.com",
  projectId: "eyego-89b67",
  storageBucket: "eyego-89b67.firebasestorage.app",
  messagingSenderId: "323224262372",
  appId: "1:323224262372:web:5628f9ad4980c3b446bef1",
  measurementId: "G-EM962V7RF0",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const database = getDatabase(app);
export const db = getFirestore(app);

console.log("Realtime Database URL:", firebaseConfig.databaseURL);
console.log("Firebase initialized:", app.name);
