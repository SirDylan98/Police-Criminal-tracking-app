// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import * as geofirestore from "geofirestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjSs-s6mW2Ksjwuml-tYqKSJGI6g2BF7M",
  authDomain: "cctv2-dissertation.firebaseapp.com",
  projectId: "cctv2-dissertation",
  storageBucket: "cctv2-dissertation.appspot.com",
  messagingSenderId: "418847431682",
  appId: "1:418847431682:web:f230bc1df92bf7f0f11b1b"
};
firebase.initializeApp({
  apiKey: "AIzaSyCjSs-s6mW2Ksjwuml-tYqKSJGI6g2BF7M",
  authDomain: "cctv2-dissertation.firebaseapp.com",
  projectId: "cctv2-dissertation",
  storageBucket: "cctv2-dissertation.appspot.com",
  messagingSenderId: "418847431682",
  appId: "1:418847431682:web:f230bc1df92bf7f0f11b1b"
});

// Initialize Firebase
const firestore = firebase.firestore();
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const GeoFirestore = geofirestore.initializeApp(firestore);
export const auth = getAuth(app);
