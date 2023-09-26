// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe3j_w5Q0YH-KxxFWLOsnBNJNaLIF4PHY",
  authDomain: "encuentra-me-f5a0a.firebaseapp.com",
  projectId: "encuentra-me-f5a0a",
  storageBucket: "encuentra-me-f5a0a.appspot.com",
  messagingSenderId: "410304758820",
  appId: "1:410304758820:web:cf0c7a348a4376686684b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db: Firestore = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

export { app, db, auth, storage };
