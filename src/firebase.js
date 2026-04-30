// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';


import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// Your brand new Firebase configuration
const firebaseConfig = {
    apiKey: "your firebase api generated key",
    authDomain: "rccg-jesus-protege.firebaseapp.com",
    projectId: "rccg-jesus-protege",
    storageBucket: "",
    messagingSenderId: "1009940906197",
    appId: "1:1009940906197:web:c4ab9f38e2e3e59d0a225c",
    measurementId: "G-ZPMD6943J3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the specific tools your components are crying out for!
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const appId = firebaseConfig.appId;

export default app;
