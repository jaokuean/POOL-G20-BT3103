import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDDIm2Qkh5suaWll769SwbPLXuvMLE-ts4",
    authDomain: "pooldb-b6390.firebaseapp.com",
    projectId: "pooldb-b6390",
    storageBucket: "pooldb-b6390.appspot.com",
    messagingSenderId: "190157167499",
    appId: "1:190157167499:web:5ff619af63db1df751ed8e",
    measurementId: "G-6CESK7X59P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase;
export default database;