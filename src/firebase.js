// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuSI3xs_w4lkDOdSM2eyOUgJBNOzH378c",
  authDomain: "groupproject-64aa3.firebaseapp.com",
  databaseURL: "https://groupproject-64aa3-default-rtdb.firebaseio.com",
  projectId: "groupproject-64aa3",
  storageBucket: "groupproject-64aa3.appspot.com",
  messagingSenderId: "678318784611",
  appId: "1:678318784611:web:11a199ed2f664a365fb856"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
// const dbRef = ref(database);

export default database;