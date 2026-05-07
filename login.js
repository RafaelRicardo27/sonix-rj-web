// ============================================================
// login.js — SONIX RJ Company
// Firebase Auth + Firestore | v9 Modular
// ============================================================


// ============================================================
// 1. IMPORTS
//    auth y provider vienen de firebase.js (ya inicializados)
//    Firestore se importa igual desde firebase.js
// ============================================================
import { auth, provider, firestore } from "./firebase.js";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
// ============================================================
// 2. REFERENCIAS AL DOM
//    Se mantienen todos los IDs existentes sin modificar
// ============================================================

const loginBtn       = document.getElementById("loginBtn");
const logoutBtn      = document.getElementById("logoutBtn");
const btnLogout      = document.getElementById("btnLogout");     // logout dentro del profilePanel
const userBtn        = document.getElementById("userBtn");
const profilePanel   = document.getElementById("profilePanel");
const closeProfile   = document.getElementById("closeProfile");

// Elementos de datos del usuario
const headerUserName = document.getElementById("headerUserName");
const userPhoto      = document.getElementById("userPhoto");
const userName       = document.getElementById("userName");
const userEmail      = document.getElementById("userEmail");

// ⚠️ userProfile se conserva por compatibilidad con el código anterior
const profile        = document.getElementById("userProfile");


// ============================================================
// 3. PANEL DE PERFIL — abrir / cerrar
// ============================================================

userBtn?.addEventListener("click", () => {
  profilePanel?.classList.toggle("hidden");
});

closeProfile?.addEventListener("click", () => {
  profilePanel?.classList.add("hidden");
});


// ============================================================
// 4. LOGIN CON GOOGLE
//    Se conserva el flag isLogging para evitar doble clic
// ============================================================

let isLogging = false;

async function loginWithGoogle() {
  if (isLogging) return;
  isLogging = true;

  try {
    await signInWithPopup(auth, provider);
    // onAuthStateChanged detecta el cambio y actualiza la UI
  } catch (err) {
    console.error("❌ Error al iniciar sesión:", err.message);
  } finally {
    isLogging = false;
  }
}

loginBtn?.addEventListener("click", loginWithGoogle);


// ============================================================
// 5. LOGOUT
//    Conectado a logoutBtn (header) y btnLogout (profilePanel)
// ============================================================

async function logout() {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("❌ Error al cerrar sesión:", err.message);
  }
}

logoutBtn?.addEventListener("click", logout);
btnLogout?.addEventListener("click", logout);


// ============================================================
// 6. GUARDAR USUARIO EN FIRESTORE
//    Solo escribe si el usuario es nuevo (no sobreescribe)
//    Incluye estructura lista para carrito y guardados
// ============================================================

async function saveUserToFirestore(user) {
  try {
    const userRef  = doc(firestore, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid:       user.uid,
        name:      user.displayName,
        email:     user.email,
        photo:     user.photoURL,
        createdAt: new Date().toISOString(),
        cart:      [],   // carrito del usuario
        saved:     []    // productos guardados
      });
      console.log("📦 Usuario nuevo guardado en Firestore");
    }
  } catch (err) {
    console.error("❌ Error guardando usuario en Firestore:", err.message);
  }
}


// ============================================================
// 7. UI — Usuario logueado
// ============================================================

function showLoggedInUI(user) {

  // Header: nombre
  if (headerUserName) headerUserName.textContent = user.displayName || "Usuario";

  // Panel de perfil: foto, nombre, email
  if (userPhoto) {
    userPhoto.src           = user.photoURL || "";
    userPhoto.style.display = user.photoURL ? "block" : "none";
  }
  if (userName)  userName.textContent  = user.displayName || "";
  if (userEmail) userEmail.textContent = user.email       || "";

  // Botones: ocultar login, mostrar logout
  if (loginBtn)  loginBtn.style.display  = "none";
  if (logoutBtn) logoutBtn.style.display = "block";

  // ⚠️ Compatibilidad con userProfile (código anterior)
  if (profile) {
    profile.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;cursor:pointer;">
        <img src="${user.photoURL}" width="36" style="border-radius:50%">
        <span>${user.displayName}</span>
      </div>
    `;
  }
}


// ============================================================
// 8. UI — Usuario deslogueado
// ============================================================

function showLoggedOutUI() {

  // Header: texto por defecto
  if (headerUserName) headerUserName.textContent = "Invitado";

  // Panel: limpiar datos
  if (userPhoto) {
    userPhoto.src           = "";
    userPhoto.style.display = "none";
  }
  if (userName)  userName.textContent  = "";
  if (userEmail) userEmail.textContent = "";

  // Botones: mostrar login, ocultar logout
  if (loginBtn)  loginBtn.style.display  = "block";
  if (logoutBtn) logoutBtn.style.display = "none";

  // Cerrar panel si estaba abierto
  profilePanel?.classList.add("hidden");

  // ⚠️ Compatibilidad con userProfile (código anterior)
  if (profile) {
    profile.innerHTML = `
      <div style="
        width:40px;height:40px;border-radius:50%;
        background:#444;display:flex;
        align-items:center;justify-content:center;cursor:pointer;
      ">👤</div>
    `;
  }
}


// ============================================================
// 9. OBSERVER — Escucha cambios de sesión en tiempo real
//    Todo el flujo de UI y Firestore pasa por aquí
// ============================================================

onAuthStateChanged(auth, async (user) => {
  if (user) {
    showLoggedInUI(user);
    await saveUserToFirestore(user);
  } else {
    showLoggedOutUI();
  }


});