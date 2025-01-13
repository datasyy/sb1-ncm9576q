import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD3WtP47JhkSM-pFP6FS5kvIrIVXy0dlf4",
  authDomain: "datasyyform.firebaseapp.com",
  projectId: "datasyyform",
  storageBucket: "datasyyform.firebasestorage.app",
  messagingSenderId: "415438437928",
  appId: "1:415438437928:web:7aaa8807f4dca90ff1bf1d",
  measurementId: "G-8SDZKFEYXS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);