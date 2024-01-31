// import firebase from 'firebase';
import { initializeApp } from 'firebase/app';

// export const API_KEY = "AIzaSyCgoix_yIxN-EwBfHppFtdgbgYwO17ePGE";

// const firebaseConfig = {
//   apiKey: "AIzaSyAEJNUL1rdx8HzwfKXDNRU--YIAKsiLqlo",
//   authDomain: "callezenwaka.firebaseapp.com",
//   databaseURL: "https://callezenwaka.firebaseio.com",
//   projectId: "callezenwaka",
//   storageBucket: "callezenwaka.appspot.com",
//   messagingSenderId: "683863678006",
//   appId: "1:683863678006:web:e9541531387f956b240c97"
// };

const firebase = initializeApp({
  apiKey: "AIzaSyAEJNUL1rdx8HzwfKXDNRU--YIAKsiLqlo",
  authDomain: "callezenwaka.firebaseapp.com",
  databaseURL: "https://callezenwaka.firebaseio.com",
  projectId: "callezenwaka",
  storageBucket: "callezenwaka.appspot.com",
  messagingSenderId: "683863678006",
  appId: "1:683863678006:web:e9541531387f956b240c97"
});

export default firebase;