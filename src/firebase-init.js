
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import { 
  getAuth, 
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyA3RZ5W9WLqnIz3rAo9GucPMNy6yLvSnqc",
  authDomain: "women-safety-app-799ba.firebaseapp.com",
  projectId: "women-safety-app-799ba",
  storageBucket: "women-safety-app-799ba.firebasestorage.app",
  messagingSenderId: "142286288712",
  appId: "1:142286288712:web:845d7540c0cd83cbc3e57d"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);


export async function googleLogin() {
  return signInWithPopup(auth, provider);
}

export function logoutUser() {
  return signOut(auth);
}

export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, callback);
}
