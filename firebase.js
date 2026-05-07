// firebase.js

// 🔥 CORE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

// 🔐 AUTH
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🗄️ REALTIME DATABASE
import { 
  getDatabase, 
  ref, 
  set, 
  push, 
  onValue 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// 🔥 FIRESTORE (IMPORTANTE)
import { getFirestore } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// 🔐 CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAaoVTX0UWElSqfp4qj7sTkS_DYIoYFj0w",
  authDomain: "sonix-rj-company-b1f26.firebaseapp.com",
  projectId: "sonix-rj-company-b1f26",
  databaseURL: "https://sonix-rj-company-b1f26-default-rtdb.firebaseio.com"
};


// 🚀 INIT
const app = initializeApp(firebaseConfig);


// 🔑 SERVICIOS
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);
const firestore = getFirestore(app);


// 📦 EXPORTS (TODO CENTRALIZADO)
export {
  auth,
  provider,
  db,
  firestore,
  ref,
  set,
  push,
  onValue,
  signInWithPopup,
  signOut,
  onAuthStateChanged
};