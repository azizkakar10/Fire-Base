import {auth , db , storage , onAuthStateChanged ,
    signOut ,getDoc , doc ,
   }  from '../Utils/utils.js'
  
   const logout_btn = document.getElementById("logout_btn");
   const login_nav_btn = document.getElementById("login_nav_btn");
   const user_img = document.getElementById("user_img");
   
  // console.log("auth==>", auth);
  // console.log("firestore==>", db);
  // console.log("storage==>", storage);
  
  onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        login_nav_btn.style.display = "none";
        user_img.style.display = "inline-block";
        getUserInfo(uid);
        // ...
      } else {
        login_nav_btn.style.display = "inline-block";
        user_img.style.display = "none";
      }
    });
  
    logout_btn.addEventListener("click" , () => {
      signOut(auth);
    });
  
    function getUserInfo(uid){
      const userRef = doc(db , 'users' , uid);
      getDoc(userRef).then((data) => {
        console.log("data id=>" , data.id);
        console.log("data==>" , data.data());
        user_img.src = data.data().img;
      });
    }