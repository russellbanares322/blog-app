import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWu_fA5B6UK9quLyyxddjtG3gaO-VmONI",
  authDomain: "blog-app-dcb0d.firebaseapp.com",
  projectId: "blog-app-dcb0d",
  storageBucket: "blog-app-dcb0d.appspot.com",
  messagingSenderId: "1015499634749",
  appId: "1:1015499634749:web:6eb21d0c75561e1f1c9254",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
