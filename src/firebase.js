import * as firebase from "firebase";
import "firebase/database";

let config = {
  apiKey: "AIzaSyA3Br-1ugjJGzVVcyhzLI4FNeslWakFECc",
  authDomain: "serie-tv-6988b.firebaseapp.com",
  databaseURL: "https://serie-tv-6988b.firebaseio.com",
  projectId: "serie-tv-6988b",
  storageBucket: "serie-tv-6988b.appspot.com",
  messagingSenderId: "904755248974",
  appId: "1:904755248974:web:ef7483e9e0b9e7fed3a81f",
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase.database();
