// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, getDocs, query, collection } from "firebase/firestore";

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
export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);


// FireStore
export const db = getFirestore();

export const addNewLocationToDb = async (locationData, category) => {
  const locationDocRef = doc(db, category, locationData.id);
  const locationSnapshot = await getDoc(locationDocRef);

  if (!locationSnapshot.exists()){
    const createdAt = new Date();

    try {
      await setDoc(locationDocRef, {createdAt, ...locationData});
      alert('Item added to DB!');
    } catch (err) {
      console.log('ERROR: ', err.message);
    }
  } else {
    alert('Location is already in Database');
  }
}

export const getAllLocationsFromDb = async () => {

  const q = query(collection(db, 'landmarks'));
  const locations = await getDocs(q);

  const locationsList = locations.docs.map(doc => doc.data());

  return locationsList;
}

