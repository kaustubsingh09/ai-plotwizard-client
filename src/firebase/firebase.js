// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfydIpqHwQ2Ack6FqkmD_E7LJiua69I_Q",
  authDomain: "storybookgen.firebaseapp.com",
  projectId: "storybookgen",
  storageBucket: "storybookgen.appspot.com",
  messagingSenderId: "119906479526",
  appId: "1:119906479526:web:8feda18e718685059df367",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//export function to initialize firebase
export const initFirebase = () => {
  return app;
};

export const auth = getAuth(app);
