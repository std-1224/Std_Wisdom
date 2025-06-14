import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_FIREBASE_APP_ID,
};

console.log("====++>", process.env)

// Initialize Firebase
const initApp = initializeApp(firebaseConfig);
const auth = getAuth(initApp);
const storage = getStorage(initApp);
const db = getFirestore(initApp);

// Google Provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, storage, db };
/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFinhnAvaKVG1YKcZkem2isTuvp3h3ISc",
  authDomain: "simple-auth-b73f2.firebaseapp.com",
  projectId: "simple-auth-b73f2",
  storageBucket: "simple-auth-b73f2.appspot.com",
  messagingSenderId: "129016557546",
  appId: "1:129016557546:web:6900c006c45f2877dccc93",
  measurementId: "G-T0WCD41NBE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
*/