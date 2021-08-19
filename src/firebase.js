'use strict'

import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/functions';
// import 'firebase/storage';     // for storage
// import 'firebase/database';    // for realtime database
// import 'firebase/firestore';   // for cloud firestore
// import 'firebase/messaging';   // for cloud messaging

// Initialize Firebase configuration. For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
	apiKey: "AIzaSyB_orUAKN5SsWF297sZFOrsaE17Us9qasE",
  authDomain: "barewave-464b5.firebaseapp.com",
  projectId: "barewave-464b5",
  storageBucket: "barewave-464b5.appspot.com",
  messagingSenderId: "106439433778",
  appId: "1:106439433778:web:686aadf25aa787ad3d662b"
})

export default firebase;