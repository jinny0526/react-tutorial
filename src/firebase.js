// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClJgkM0-AQ4cuJ7pGpRVdCpdHwp8c9tko",
  authDomain: "fir-test-61ab9.firebaseapp.com",
  projectId: "fir-test-61ab9",
  storageBucket: "fir-test-61ab9.appspot.com",
  messagingSenderId: "468084315202",
  appId: "1:468084315202:web:fae017949266d4e54dc9db",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
