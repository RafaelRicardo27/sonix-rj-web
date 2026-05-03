// login.js

import { auth, provider } from "./firebase.js";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ELEMENTOS HTML
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const profile = document.getElementById("userProfile");

// CONTROL DE CLICK DOBLE
let isLogging = false;

// LOGIN CON GOOGLE
loginBtn?.addEventListener("click", async () => {
  if (isLogging) return;
  isLogging = true;

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Login exitoso:", result.user);
  } catch (err) {
    console.error("Error en login:", err);

    // ERRORES COMUNES
    if (err.code === "auth/popup-closed-by-user") {
      alert("Cerraste la ventana de login");
    }

    if (err.code === "auth/cancelled-popup-request") {
      console.warn("Ya había un popup abierto");
    }

    if (err.code === "auth/unauthorized-domain") {
      alert("Este dominio no está autorizado en Firebase");
    }
  }

  isLogging = false;
});

// LOGOUT
logoutBtn?.addEventListener("click", async () => {
  try {
    await signOut(auth);
    console.log("Sesión cerrada");
  } catch (err) {
    console.error("Error al cerrar sesión:", err);
  }
});

// ESTADO DEL USUARIO (MUY IMPORTANTE)
onAuthStateChanged(auth, user => {

  if (user) {
    console.log("Usuario activo:", user.displayName);

    // BOTONES
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "block";

    // PERFIL
    if (profile) {
      profile.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;">
          <img src="${user.photoURL}" 
               width="36" 
               height="36"
               style="border-radius:50%; border:2px solid #3da5ff;">
          <span style="font-size:0.9rem;">${user.displayName}</span>
        </div>
      `;
    }

  } else {
    console.log("No hay usuario");

    // BOTONES
    if (loginBtn) loginBtn.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "none";

    // PERFIL VACÍO
    if (profile) profile.innerHTML = "";
  }
});