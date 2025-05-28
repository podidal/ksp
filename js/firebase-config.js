// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGGpNFxQ1bfY4ViSdNM7uOBuk7u_cyxtk",
  authDomain: "ksplus-60132.firebaseapp.com",
  projectId: "ksplus-60132",
  storageBucket: "ksplus-60132.firebasestorage.app",
  messagingSenderId: "1037863910173",
  appId: "1:1037863910173:web:76bebcb7310eaa78a23ff4",
  measurementId: "G-17JRYGSH0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
