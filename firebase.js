// FIREBASE CONFIG

import { initializeApp } from 
"firebase/app";
import { getAuth,
GoogleAuthProvider
} from 
"https://firebase.google.com/docs/web/setup#available-libraries";


// PEGA TU CONFIG AQUÍ
const firebaseConfig = {

 apiKey: "AIzaSyAaoVTX0UWElSqfp4qj7sTkS_DYIoYFj0w",
 authDomain: "sonix-rj-company-b1f26.firebaseapp.com",
 projectId: "sonix-rj-company-b1f26"

};


// INICIAR FIREBASE
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();


// EXPORTAR
export { auth, provider };