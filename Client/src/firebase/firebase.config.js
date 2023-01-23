// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC27YGl1Tisd1TdzgDm1fxdSrTu-fGeGMQ",
    authDomain: "doctor-app-bd718.firebaseapp.com",
    projectId: "doctor-app-bd718",
    storageBucket: "doctor-app-bd718.appspot.com",
    messagingSenderId: "70138429547",
    appId: "1:70138429547:web:6dc47951053e198bebb12e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app