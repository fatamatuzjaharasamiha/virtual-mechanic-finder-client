// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuVctE-Le3kqHHndv7pxoUn_L6jlklKhk",
  authDomain: "virtual-automechanic-finder.firebaseapp.com",
  projectId: "virtual-automechanic-finder",
  storageBucket: "virtual-automechanic-finder.appspot.com",
  messagingSenderId: "333110330422",
  appId: "1:333110330422:web:4dec6c6ebc84096ef5c497"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;