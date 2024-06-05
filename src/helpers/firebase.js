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

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

const notifyConfig = {
  apiKey: "AIzaSyDOJq9B7CHXuHLLgM-tPbTxniLQ7N2I60Y",
  authDomain: "healthcare-2d0e4.firebaseapp.com",
  projectId: "healthcare-2d0e4",
  storageBucket: "healthcare-2d0e4.appspot.com",
  messagingSenderId: "62028396370",
  appId: "1:62028396370:web:8e7ec3ade116696f11ac8b",
  measurementId: "G-YK5DTS4CWV",
};

// Initialize Firebase
const notify = initializeApp(notifyConfig, "notify");

export const authNotify = getAuth(notify);
export const dbNotify = getFirestore(notify);
export const storageNotify = getStorage(notify);


const chatbotConfig = {
  apiKey: "AIzaSyDOJq9B7CHXuHLLgM-tPbTxniLQ7N2I60Y",
  authDomain: "healthcare-2d0e4.firebaseapp.com",
  projectId: "healthcare-2d0e4",
  storageBucket: "healthcare-2d0e4.appspot.com",
  messagingSenderId: "62028396370",
  appId: "1:62028396370:web:8e7ec3ade116696f11ac8b",
  measurementId: "G-YK5DTS4CWV",
};

// Initialize Firebase
const chatbot = initializeApp(chatbotConfig, "chatbot");

export const authChatbot = getAuth(chatbot);
export const dbChatbot = getFirestore(chatbot);
export const storageChatbot = getStorage(chatbot);