  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
  import { getAuth,
     onAuthStateChanged,
     createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
 
  const firebaseConfig = {
    apiKey: "AIzaSyACe6Bua3KH8lmae4Ita0_NhP_jboeODz4",
    authDomain: "project-1-18ffa.firebaseapp.com",
    projectId: "project-1-18ffa",
    storageBucket: "project-1-18ffa.appspot.com",
    messagingSenderId: "458681061369",
    appId: "1:458681061369:web:d9dafd62199a4abea0f728",
    measurementId: "G-VJC0JJPL95"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
//   console.log("app==>",app);
  const analytics = getAnalytics(app);

  const auth = getAuth(app);
//   console.log("auth==>", auth);
const signup_email = document.getElementById("signup_email")
const signup_password = document.getElementById("signup_password")
const signup_btn = document.getElementById("signup_btn")
signup_btn.addEventListener("click", createUserAccount)



onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is Logged In");
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    console.log("User is not Logged In");
    // User is signed out
    // ...
  }
});

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  function createUserAccount(){}