// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import Firebase from "firebase/firebase";
// Add the Firebase services that you want to use

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBpwBOUn-IXLzRBh-76lwPp4Brgt8JOIMA",
  authDomain: "instagram-react-app-f008d.firebaseapp.com",
  databaseURL: "https://instagram-react-app-f008d-default-rtdb.firebaseio.com",
  projectId: "instagram-react-app-f008d",
  storageBucket: "instagram-react-app-f008d.appspot.com",
  messagingSenderId: "439197155207",
  appId: "1:439197155207:web:048945526a436a3b3c9d22",
  measurementId: "G-4TK9LWDNL6"
};

  const firebase = Firebase.initializeApp(firebaseConfig);
  const fieldValue = Firebase.firestore();
  const auth = Firebase.auth();
  const storage = Firebase.storage();

  export {firebase, fieldValue, auth, storage};