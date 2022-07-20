import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBReU5G5EW5fLag4iJ6uAfopXcHd1boXY4",
    authDomain: "whatsapp-mern-74cc4.firebaseapp.com",
    projectId: "whatsapp-mern-74cc4",
    storageBucket: "whatsapp-mern-74cc4.appspot.com",
    messagingSenderId: "343562193991",
    appId: "1:343562193991:web:3ce10617fed0d63407f562"
  };

  const firebaseApp= firebase.initializeApp(firebaseConfig);

  const db= firebaseApp.firestore();

  const auth= firebase.auth();

  const provider=new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  