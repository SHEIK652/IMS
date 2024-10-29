
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDaA-z6wV9IEfrWk5eZ1k61WhR_O15UMOE",
  authDomain: "inventory-ms-1945e.firebaseapp.com",
  projectId: "inventory-ms-1945e",
  storageBucket: "inventory-ms-1945e.appspot.com",
  messagingSenderId: "21332803174",
  appId: "1:21332803174:web:228f9525f92da13b6bf7a7",
  measurementId: "G-D7JMKN12GX",
  databaseURL: "https://inventory-ms-1945e-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
