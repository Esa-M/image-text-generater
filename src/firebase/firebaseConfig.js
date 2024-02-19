
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCySUgIp3cNzYPqEmddm3VB2X7GLqSd3oE",
  authDomain: "llava-2024.firebaseapp.com",
  projectId: "llava-2024",
  storageBucket: "llava-2024.appspot.com",
  messagingSenderId: "171925164803",
  appId: "1:171925164803:web:0a758569bad5abf2678f36",
  measurementId: "G-VDZ4ZP7BK5"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)



