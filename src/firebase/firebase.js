// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWlvhXOkLcQYuyEEPIz1kvmGzaD0qAhMk",
  authDomain: "assetflow-6c9af.firebaseapp.com",
  projectId: "assetflow-6c9af",
  storageBucket: "assetflow-6c9af.firebasestorage.app",
  messagingSenderId: "1062558475406",
  appId: "1:1062558475406:web:b5c1335fe89659ed5e55df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;