import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBxJmo3lf_h6Zq0H2WNvo-6nBa7PaMDLHk",
  authDomain: "aura-cloth-4ce17.firebaseapp.com",
  projectId: "aura-cloth-4ce17",
  storageBucket: "aura-cloth-4ce17.firebasestorage.app",
  messagingSenderId: "131351824930",
  appId: "1:131351824930:web:110cd1dc6c291cc88bd87b"
};

// Initialize Firebase with error handling
let app;
let auth;
let db;
let storage;
let googleProvider;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  googleProvider = new GoogleAuthProvider();
} catch (error) {
  console.warn('Firebase initialization failed:', error);
  // Create mock objects to prevent crashes
  auth = null;
  db = null;
  storage = null;
  googleProvider = null;
}

export { auth, db, storage, googleProvider };
export default app;