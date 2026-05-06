import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAm9ULbmtv2yWlA6n6p2kDsiW30xAtrBEc",
  authDomain: "line-up-45179.firebaseapp.com",
  databaseURL: "https://line-up-45179-default-rtdb.firebaseio.com",
  projectId: "line-up-45179",
  storageBucket: "line-up-45179.firebasestorage.app",
  messagingSenderId: "648024848805",
  appId: "1:648024848805:web:190cf75820fe924524d04c",
  measurementId: "G-3N7FHKRP95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, onValue, update };
