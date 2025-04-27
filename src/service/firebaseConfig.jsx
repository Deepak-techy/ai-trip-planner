// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfhihkCznubQSHnsgFgl4lKd0f-tAl9F0",
  authDomain: "ai-trip-planner-457516.firebaseapp.com",
  projectId: "ai-trip-planner-457516",
  storageBucket: "ai-trip-planner-457516.firebasestorage.app",
  messagingSenderId: "775755853931",
  appId: "1:775755853931:web:1876ff79f543ff6908812e",
  measurementId: "G-2HF9MRRX2N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);