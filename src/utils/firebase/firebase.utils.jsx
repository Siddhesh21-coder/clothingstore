import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
 } from 'firebase/auth';
 import {
  getFirestore,
  doc,
  getDoc,
  setDoc
 } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyB4vuqIqeqpDsg3JV0ARI2Zl-E_2htrnZ0",
    authDomain: "clothing-dd-a03c7.firebaseapp.com",
    projectId: "clothing-dd-a03c7",
    storageBucket: "clothing-dd-a03c7.appspot.com",
    messagingSenderId: "401286385306",
    appId: "1:401286385306:web:2c6c4da693a37c91221923"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);
  
  export const db = getFirestore();
  export const createUserDocumentFromAuth = async(userAuth,additionalInformation) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users',userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      }catch(error) {
        console.log('error creating the user',error.message);
      }
    }
    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return createUserWithEmailAndPassword(auth,email,password);
  }