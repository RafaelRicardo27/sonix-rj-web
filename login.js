// login.js

import { auth, provider } from "./firebase.js";
import { signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// BOTONES
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

// LOGIN
let isLogging = false;

loginBtn?.addEventListener("click", async () => {
  if (isLogging) return;
  isLogging = true;

  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    console.error(err);
  }

  isLogging = false;
});

// LOGOUT
logoutBtn?.addEventListener("click", async () => {
  await signOut(auth);
});

// ESTADO
onAuthStateChanged(auth, user => {
  if (user) {
    console.log("Usuario:", user.displayName);
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }

  const profile = document.getElementById("userProfile");

if (user) {
  profile.innerHTML = `
    <img src="${user.photoURL}" width="40" style="border-radius:50%">
    <span>${user.displayName}</span>
  `;
} else {
  profile.innerHTML = "";
}
});