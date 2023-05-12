import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw_yd2ZiGrLPaV0xcrtb03AeTKyWvITb8",
  authDomain: "parson-e896a.firebaseapp.com",
  projectId: "parson-e896a",
  storageBucket: "parson-e896a.appspot.com",
  messagingSenderId: "341592918502",
  appId: "1:341592918502:web:51ce160f2c1ac1982a2e27",
  measurementId: "G-RFZNTJX9WZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

export {firestore};
