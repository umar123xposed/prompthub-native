
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyC99rCk0jTSW_eBYere6RLqnhT3Fr-_1AM",
  authDomain: "prompt-418014.firebaseapp.com",
  projectId: "prompt-418014",
  storageBucket: "prompt-418014.firebasestorage.app",
  messagingSenderId: "832888115053",
  appId: "1:832888115053:web:2bf96fa27c4eee45e11464",
  measurementId: "G-FEMFEB75ZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, firestore, provider };
