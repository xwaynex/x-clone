import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//web app's firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqZs8UhWbdbaErYQhQMnYD02QDoZjwyTk",
  authDomain: "x-clone-1e8d8.firebaseapp.com",
  projectId: "x-clone-1e8d8",
  storageBucket: "x-clone-1e8d8.firebasestorage.app",
  messagingSenderId: "53407241138",
  appId: "1:53407241138:web:681c8a414ff14de755caab"
};

//initialize firebase 
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export default app
export {db, storage}