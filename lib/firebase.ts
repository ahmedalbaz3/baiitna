import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0WRdrrYFbYflaIRRN54kqcDkQfAuqpQ4",
  authDomain: "baiitna-d5aae.firebaseapp.com",
  projectId: "baiitna-d5aae",
  storageBucket: "baiitna-d5aae.firebasestorage.app",
  messagingSenderId: "809408322349",
  appId: "1:809408322349:web:6f1c49447a9cd36a2ad1a4",
  measurementId: "G-STXD1S5TYR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
