// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "wander-sri-lanka-d57d0.firebaseapp.com",
  projectId: "wander-sri-lanka-d57d0",
  storageBucket: "wander-sri-lanka-d57d0.appspot.com",
  messagingSenderId: "632819175879",
  appId: "1:632819175879:web:14bc20d84bcaefe5fac9e2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();
export const signInWithEmailPw = async (email, password) => {
  if(!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password);
};

// FireStore
// export const db = getFirestore();

// export const createUserDocumentFromAuth = async (userAuth) => {
//   const userDocRef = doc(db, 'users', userAuth.uid);
//   const userSnapshot = await getDoc(userDocRef);

//   if (!userSnapshot.exists()){
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();

//     try {
//       await setDoc(userDocRef, {displayName, email, createdAt});
//     } catch (err) {
//       console.log('ERROR: ', err.message);
//     }
//   }

//   return userDocRef;
// }