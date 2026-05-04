// ============================================================
// firebase.js — SONIX RJ Company
// Firebase v9 Modular SDK
// ============================================================


// ============================================================
// 1. IMPORTS
// ============================================================

import { initializeApp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { getFirestore, doc, setDoc, getDoc, collection, addDoc, onSnapshot }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// ============================================================
// 2. CONFIGURACIÓN — Rellena con tus datos de Firebase Console
// ============================================================

const firebaseConfig = {
  apiKey:            "TU_API_KEY",
  authDomain:        "TU_PROJECT.firebaseapp.com",
  projectId:         "TU_PROJECT_ID",
  storageBucket:     "TU_PROJECT.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId:             "TU_APP_ID"
};


// ============================================================
// 3. INICIALIZACIÓN (una sola vez)
// ============================================================

const app = initializeApp(firebaseConfig);


// ============================================================
// 4. SERVICIOS
// ============================================================

const auth     = getAuth(app);
const provider = new GoogleAuthProvider();
const db       = getFirestore(app);


// ============================================================
// 5. EXPORTACIONES
// ============================================================

export {
  // Core
  auth,
  provider,
  db,

  // Auth helpers
  signInWithPopup,
  signOut,
  onAuthStateChanged,

  // Firestore helpers
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  onSnapshot
};