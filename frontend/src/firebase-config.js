import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA2KEXWOclRwa2bKoRANbR5HDxloxzvPxI",
    authDomain: "water-plant-management-app.firebaseapp.com",
    projectId: "water-plant-management-app",
    storageBucket: "water-plant-management-app.appspot.com",
    messagingSenderId: "255262396047",
    appId: "1:255262396047:web:34b186733a01873b492afa",
    measurementId: "G-NWL7FPLEVX"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);