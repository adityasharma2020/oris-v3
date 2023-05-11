// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBxqirbxjpYQXvWa6GspUwcIgIu3L2OAMs',
  authDomain: 'oris-v3.firebaseapp.com',
  projectId: 'oris-v3',
  storageBucket: 'oris-v3.appspot.com',
  messagingSenderId: '927612870487',
  appId: '1:927612870487:web:d4373886380c40aa4f6812',
  measurementId: 'G-SMPFHE29YT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
