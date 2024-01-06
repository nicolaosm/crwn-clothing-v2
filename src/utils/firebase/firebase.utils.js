import { initializeApp } from "firebase/app";
import {
  signInWithRedirect,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKoPr7BruD56TS1neD4pzBCHIs8X2Y_aU",
  authDomain: "crown-ecom-cc1bf.firebaseapp.com",
  projectId: "crown-ecom-cc1bf",
  storageBucket: "crown-ecom-cc1bf.appspot.com",
  messagingSenderId: "1022119083703",
  appId: "1:1022119083703:web:ba65f6e15be19b28471732",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//create google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);
export const signInWithFacebookPopup = () =>
  signInWithPopup(auth, new FacebookAuthProvider());

// initialize firestore DB
const db = getFirestore(firebaseApp);

// const citiesRef = collection(db, "cities");
// const docRef = doc(db, "cities", "SF2");
// const docSnap = await getDoc(docRef);

export const createUserProfileDocument = async (
  userAuth,
  additionalInformation = {}
) => {
  const docRef = doc(db, "users", userAuth.uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(doc(db, "users", userAuth.uid), {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  } else {
    console.log("USER EXISTS");
    console.log("docSnap:", docSnap);
    const loggedInAt = new Date();
    try {
      await updateDoc(docRef, {
        loggedInAt,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// export const getDocRef = async () => {
//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//     // docSnap.data() will be undefined in this case
//     console.log("No such document!");
//     console.log("docSnap:", docSnap);
//   }
// };

// export const setMyDoc = async () => {
//   await setDoc(doc(db, "cities", "LA"), {
//     name: "LOS ANGELES",
//     state: "LA2",
//     country: "USA",
//     capital: false,
//     population: 860000,
//     regions: ["west_coast", "norcal"],
//   });
// };
