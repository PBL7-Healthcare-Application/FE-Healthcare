// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_Firebase_Key,
  authDomain: "pbl7-f2525.firebaseapp.com",
  projectId: "pbl7-f2525",
  storageBucket: "pbl7-f2525.appspot.com",
  messagingSenderId: "329864615173",
  appId: "1:329864615173:web:cc7b272d138a80df27536c",
  measurementId: "G-2XDC1QK9T7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
