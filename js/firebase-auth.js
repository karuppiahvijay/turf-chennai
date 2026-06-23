// firebase-auth.js
// Firebase SDK modules (using CDN for static hosting)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updatePassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCSON7KBcVjAm-Pf2sbsD3rES7Qdri2Tk8",
  authDomain: "kick-and-flick.firebaseapp.com",
  projectId: "kick-and-flick",
  storageBucket: "kick-and-flick.firebasestorage.app",
  messagingSenderId: "77858902826",
  appId: "1:77858902826:web:30761d9bc0b470688b4453",
  measurementId: "G-8Q13DYCZ78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Make auth globally available for our other scripts
window.firebaseAuth = auth;
window.firebaseAuthMethods = {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updatePassword
};
