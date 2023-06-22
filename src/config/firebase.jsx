import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAUHRPCxzCLXB9r4-TK4cw5D5eXHBbHg_Q",
  authDomain: "fir-auth-26a98.firebaseapp.com",
  projectId: "fir-auth-26a98",
  storageBucket: "fir-auth-26a98.appspot.com",
  messagingSenderId: "988700958465",
  appId: "1:988700958465:web:e8ebdc1f4dd1cf3b8c0500",
  measurementId: "G-NWTEMGBEYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);