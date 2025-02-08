import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "fashion-ethnic.firebaseapp.com",
  projectId: "fashion-ethnic",
  storageBucket: "fashion-ethnic.firebasestorage.app",
  messagingSenderId: "674821004984",
  appId: "1:674821004984:web:fab4f13ddc61fcb4245e4d",
  measurementId: "G-KVX5T6JFH4"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();