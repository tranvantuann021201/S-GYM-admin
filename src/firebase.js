// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsD6_Lz5aBTgbDhGNpjNM17qkLfAWPrRI",
    authDomain: "fir-gym-6ac36.firebaseapp.com",
    databaseURL: "https://fir-gym-6ac36-default-rtdb.firebaseio.com",
    projectId: "fir-gym-6ac36",
    storageBucket: "fir-gym-6ac36.appspot.com",
    messagingSenderId: "480911230179",
    appId: "1:480911230179:web:16c86f0485fcaa3290f1d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);