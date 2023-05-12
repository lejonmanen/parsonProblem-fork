import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {HashRouter as Router } from 'react-router-dom';
import './index.css'
import './App.css'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCw_yd2ZiGrLPaV0xcrtb03AeTKyWvITb8",
  authDomain: "parson-e896a.firebaseapp.com",
  projectId: "parson-e896a",
  storageBucket: "parson-e896a.appspot.com",
  messagingSenderId: "341592918502",
  appId: "1:341592918502:web:51ce160f2c1ac1982a2e27",
  measurementId: "G-RFZNTJX9WZ"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)

export {firestore};
