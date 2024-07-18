import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getAuth ,
     onAuthStateChanged,
     createUserWithEmailAndPassword ,
     signInWithEmailAndPassword, signOut ,   } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore ,
    doc, setDoc ,getDoc ,
    collection,getDocs,
    query,
    where,
    deleteDoc,updateDoc,
    arrayUnion,
    arrayRemove,
    addDoc, } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage ,
    ref , uploadBytes, getDownloadURL   } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCuXq5oRBaBDRrTt0Y1iulFcu6qN9i-TF0",
  authDomain: "event-planner-64bb2.firebaseapp.com",
  projectId: "event-planner-64bb2",
  storageBucket: "event-planner-64bb2.appspot.com",
  messagingSenderId: "1015559646956",
  appId: "1:1015559646956:web:9d439ee158a967e2c0ffc9",
  measurementId: "G-P7V419XFB5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export{
    auth ,db , storage , onAuthStateChanged , createUserWithEmailAndPassword , 
    doc , setDoc , ref , uploadBytes , getDownloadURL , signInWithEmailAndPassword ,
    signOut , getDoc ,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    updateDoc,
  arrayUnion,
  arrayRemove,
}