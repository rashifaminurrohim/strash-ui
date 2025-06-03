import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC7_WJywj3siZQ9mwAl-5AfoWjUImCignU",
  authDomain: "klasifikasi-sampah-e3c61.firebaseapp.com",
  projectId: "klasifikasi-sampah-e3c61",
  storageBucket: "klasifikasi-sampah-e3c61.appspot.com",
  messagingSenderId: "442515182677",
  appId: "1:442515182677:web:477edbe97597fee82030dc",
  measurementId: "G-XLT11M95HB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

export { auth, db, storage }; 