// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCdyXuoTZyqaTovj5kZlbz9cYh-OYg1v9Q",
  authDomain: "react-auth-c5aeb.firebaseapp.com",
  projectId: "react-auth-c5aeb",
  storageBucket: "react-auth-c5aeb.appspot.com",
  messagingSenderId: "768820425713",
  appId: "1:768820425713:web:11ae25a75b01d1a2e08a50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
