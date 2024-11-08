import React from 'react'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Main from './components/Main';

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const App = () => {
  return (
    <div>
      <Main />
    </div>
  )
}

export default App;

