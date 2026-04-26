import { auth, provider } from "./firebase.js";

import {
 signInWithPopup,
 signOut,
 onAuthStateChanged
} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// LOGIN
document
.getElementById("loginBtn")
.addEventListener("click", async () => {

 try {

   await signInWithPopup(auth, provider);

 } catch (error) {

   console.error(error);

 }

});


// LOGOUT
document
.getElementById("logoutBtn")
.addEventListener("click", () => {

 signOut(auth);

});


// DETECTAR USUARIO
onAuthStateChanged(auth, (user) => {

 const name = document.getElementById("userName");

 if (user) {

   name.textContent = user.displayName;

 } else {

   name.textContent = "Invitado";

 }

});