// Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firestore
import { getFirestore } from "firebase/firestore";

// Authentication
import { getAuth } from "firebase/auth";

// Configuración
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-9H40JRP27P",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Analytics (opcional)
getAnalytics(app);

// Firestore
const db = getFirestore(app);

// Authentication
const auth = getAuth(app);

export { db, auth };