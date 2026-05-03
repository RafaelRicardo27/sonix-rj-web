// firebase.js

// 🔥 IMPORTS REALES (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { getDatabase, ref, set, push, onValue } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


// 🔐 CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAaoVTX0UWElSqfp4qj7sTkS_DYIoYFj0w",
  authDomain: "sonix-rj-company-b1f26.firebaseapp.com",
  projectId: "sonix-rj-company-b1f26",
  databaseURL: "https://sonix-rj-company-b1f26-default-rtdb.firebaseio.com"
};


// 🚀 INICIALIZAR (UNA SOLA VEZ)
const app = initializeApp(firebaseConfig);


// 🔑 SERVICIOS
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);


// 📦 EXPORTAR
export {
  auth,
  provider,
  db,
  ref,
  set,
  push,
  onValue,
  signInWithPopup,
  signOut,
  onAuthStateChanged
};