// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3ZIJ5BvLh7Oa0Q6WnLBrUxsJmAQany68",
  authDomain: "react-hive-tool-73d34.firebaseapp.com",
  projectId: "react-hive-tool-73d34",
  storageBucket: "react-hive-tool-73d34.appspot.com",
  messagingSenderId: "702156780636",
  appId: "1:702156780636:web:b7ca6769718edaa31ae299",
  measurementId: "G-LX65NFJL7T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
