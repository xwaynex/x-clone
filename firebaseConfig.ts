import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//web app's firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: "x-clone-1e8d8.firebaseapp.com",
  projectId: "x-clone-1e8d8",
  storageBucket: "x-clone-1e8d8.firebasestorage.app",
  messagingSenderId: "53407241138",
  appId: process.env.NEXT_FIREBASE_APP_ID,
};

//initialize firebase 
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export default app
export {db, storage}