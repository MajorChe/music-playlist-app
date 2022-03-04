import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

//initialize firebase

firebase.initializeApp(firebaseConfig);

//initialize service

const musicPlaylistApp = firebase.firestore();
const musicPlaylistAppAuth = firebase.auth();
const musicPlaylistAppStorage = firebase.storage();

const timestamp = firebase.firestore.Timestamp;

export {
  musicPlaylistApp,
  musicPlaylistAppAuth,
  musicPlaylistAppStorage,
  timestamp,
};
