import {auth , db , storage , onAuthStateChanged ,
    signOut ,getDoc , doc , ref,
    uploadBytes,
    getDownloadURL,
    collection,
    addDoc,
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
    };



    const event_form = document.getElementById("event_form");

event_form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);

  const eventInfo = {
    banner: e.target[0].files[0],
    title: e.target[1].value,
    desc: e.target[2].value,
    price: e.target[3].value,
    deliveryLocation: e.target[4].value,
    discount: e.target[5].value,
    createdBy: auth.currentUser.uid,
    createdByEmail: auth.currentUser.email,
    Ordered: [],
  };
  const imgRef = ref(storage, eventInfo.banner.name);
  uploadBytes(imgRef, eventInfo.banner).then(() => {
    console.log("File Upload Done");
    getDownloadURL(imgRef).then((url) => {
      console.log("Url agye", url);
      eventInfo.banner = url;
      // add document to events collection
      const eventCollection = collection(db, "products");
      addDoc(eventCollection, eventInfo).then(() => {
        console.log("Document ADDED");
        window.location.href = "/";
      });
    });
  });
});