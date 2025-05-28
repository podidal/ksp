// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-example-key-replace-with-your-actual-key",
  authDomain: "komfort-service-plus.firebaseapp.com",
  projectId: "komfort-service-plus",
  storageBucket: "komfort-service-plus.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789jkl"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();

// Google auth provider
const googleProvider = new firebase.auth.GoogleAuthProvider(); 