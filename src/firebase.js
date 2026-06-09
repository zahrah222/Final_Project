import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBty7fZPOYm5wxVpUlagcjHoW0XUTim-GY",
  authDomain: "zahrafinalproject438-hcde.firebaseapp.com",
  projectId: "zahrafinalproject438-hcde",
  storageBucket: "zahrafinalproject438-hcde.firebasestorage.app",
  messagingSenderId: "335355375158",
  appId: "1:335355375158:web:209009a595848c6eddb297"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);