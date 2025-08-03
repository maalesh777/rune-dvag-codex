
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import type { Auth, User } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, getDocs, addDoc, updateDoc, doc, where, limit, runTransaction, serverTimestamp } from 'firebase/firestore';
import type { Firestore, QueryDocumentSnapshot, DocumentData, Timestamp } from 'firebase/firestore';
import { FIREBASE_CONFIG } from './config.ts';
import type { FirebaseApp } from 'firebase/app';

// Check if all required keys are present and not placeholders.
const requiredKeys: (keyof typeof FIREBASE_CONFIG)[] = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingOrPlaceholderKeys = requiredKeys.filter(
  key => !FIREBASE_CONFIG[key] || String(FIREBASE_CONFIG[key]).includes('YOUR_FIREBASE_')
);

if (missingOrPlaceholderKeys.length > 0) {
    throw new Error(`Firebase config in config.ts is incomplete or contains placeholder values for: ${missingOrPlaceholderKeys.join(', ')}. Please update it with your project credentials.`);
}


// Initialize Firebase using the v8 compat API to ensure stability, while allowing the rest of the app to use the modern modular API.
const app: FirebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(FIREBASE_CONFIG);

// Get instances of Firebase services using the modular API.
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


// --- Centralized Exports ---

// Export initialized instances
export { db, auth, app, googleProvider };

// Re-export Firebase Auth functions and types
export { 
  onAuthStateChanged, 
  signOut, 
  signInWithPopup,
};

// Re-export Firebase Firestore functions and types
export { 
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  where,
  limit,
  runTransaction,
  serverTimestamp
};
export type { 
    User,
    QueryDocumentSnapshot,
    DocumentData,
    Timestamp,
    FirebaseApp
};
