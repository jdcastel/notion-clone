// Import the functions you need from the SDKs you need
import { getApps, initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY4GGgemWr170VzmuCgLHp2apun13Wt0U",
  authDomain: "notion-clone-9a4cb.firebaseapp.com",
  projectId: "notion-clone-9a4cb",
  storageBucket: "notion-clone-9a4cb.firebasestorage.app",
  messagingSenderId: "453907643321",
  appId: "1:453907643321:web:1703a16a6fa547696f9468"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export {db};