// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGGpNFxQ1bfY4ViSdNM7uOBuk7u_cyxtk",
  authDomain: "ksplus-60132.firebaseapp.com",
  projectId: "ksplus-60132",
  storageBucket: "ksplus-60132.firebasestorage.app",
  messagingSenderId: "1037863910173",
  appId: "1:1037863910173:web:76bebcb7310eaa78a23ff4",
  measurementId: "G-17JRYGSH0S"
};

// Initialize Firebase with compat version
if (typeof firebase !== 'undefined') {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Make Firebase services available globally
  window.auth = firebase.auth();
  window.db = firebase.firestore();
  window.googleProvider = new firebase.auth.GoogleAuthProvider();

  console.log('Firebase initialized successfully');
} else {
  console.error('Firebase SDK not loaded');
}
