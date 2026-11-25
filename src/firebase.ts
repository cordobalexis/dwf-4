import { initializeApp } from 'firebase/app';
import { getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCRgtSnKwQbn9BGwmJQoc5CEi0uiWRr9kw",
  authDomain: "piedra-papel-tijera-9c005.firebaseapp.com",
  databaseURL: "https://piedra-papel-tijera-9c005-default-rtdb.firebaseio.com",
  projectId: "piedra-papel-tijera-9c005",
  storageBucket: "piedra-papel-tijera-9c005.firebasestorage.app",
  messagingSenderId: "1094023913797",
  appId: "1:1094023913797:web:2e24c9a4827d2a021ede2c",
  measurementId: "G-XCB8LCK4XB"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);