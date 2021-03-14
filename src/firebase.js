import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAqJCXWJTA4CTBdNt714gc05sf_KdzWsG0",
  authDomain: "itzik-chatrooms.firebaseapp.com",
  projectId: "itzik-chatrooms",
  storageBucket: "itzik-chatrooms.appspot.com",
  messagingSenderId: "408890751673",
  appId: "1:408890751673:web:66aa084e803829f8b4b968",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
