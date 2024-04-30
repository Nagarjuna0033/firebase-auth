import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyBt14Mr69RcxH2AVXr0Z6kf59XMZNHk-Uw",
    authDomain: "fir-auth-e8369.firebaseapp.com",
    projectId: "fir-auth-e8369",
    storageBucket: "fir-auth-e8369.appspot.com",
    messagingSenderId: "438100951845",
    appId: "1:438100951845:web:11412e711338aa4b7ad0cc",
    measurementId: "G-PCTSCQ4YKT",
    databaseURL: "https://fir-auth-e8369-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;
