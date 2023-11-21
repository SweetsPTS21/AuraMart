// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvkRB6av5n2FCC3GeSD4a7KXjueJphnPE",
    authDomain: "tiki-2fb09.firebaseapp.com",
    projectId: "tiki-2fb09",
    storageBucket: "tiki-2fb09.appspot.com",
    messagingSenderId: "402536837269",
    appId: "1:402536837269:web:b8d6adfc29e0b16c232b9c",
    measurementId: "G-KDL280WBHP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
