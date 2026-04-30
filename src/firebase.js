// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

// //These were corrupted for kiraboisaac6@gmail.com
// // const firebaseConfig = {
// //   apiKey: "AIzaSyDH_5A2QbcsKoDHGF_x-KWA5VM-mdLMOMc",
// //   authDomain: "vcm-church.firebaseapp.com",
// //   projectId: "vcm-church",
// //   storageBucket: "vcm-church.firebasestorage.app",
// //   messagingSenderId: "335218669549",
// //   appId: "1:335218669549:web:205faa0195a5ddadf719e4",
// //   measurementId: "G-TLWWEW7PRR"
// // };

// //These are for kiraboisaacdev
// const firebaseConfig = {
//   apiKey: "AIzaSyAjfu5paP_GHV0SE741EKWb1iynfi_IU-w",
//   authDomain: "vcm-church-website.firebaseapp.com",
//   projectId: "vcm-church-website",
//   storageBucket: "vcm-church-website.firebasestorage.app",
//   messagingSenderId: "163455510460",
//   appId: "1:163455510460:web:b325d202d794f250ba2db9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize and export Firebase services for the rest of your app to use
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// // Export the appId to be used in your specific Firestore paths
// export const appId = firebaseConfig.appId;

// export default app;


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
