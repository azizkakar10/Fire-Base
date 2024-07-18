import {auth , db , storage , onAuthStateChanged ,
    signOut ,getDoc , doc ,
    getDocs,
    collection,
    query,
    where,
    deleteDoc,
   }  from '../Utils/utils.js'
  
   const logout_btn = document.getElementById("logout_btn");
   const login_nav_btn = document.getElementById("login_nav_btn");
   const user_img = document.getElementById("user_img");
   const products_cards_container = document.getElementById("products_cards_container");
   
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
        getMyproducts(user.uid);
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

    async function getMyproducts(uid) {
        try {
          const q = query(collection(db, "products"), where("createdBy", "==", uid));
          const querySnapshot = await getDocs(q);
          products_cards_container.innerHTML = "";
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
      
            const product = doc.data();
      
            console.log("product=>", product);
      
            const { banner, title, desc, createdByEmail, price , discount , deliveryLocation  } =
              product;
      
            const card = `<div class="bg-white shadow-md rounded-lg overflow-hidden mt-10">
              <img
                src="${banner}"
                alt="Event Image"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h2 class="text-xl font-bold mb-2">${title}</h2>
                <p class="text-gray-600 mb-2">Price: ${price}</p>
                <p class="text-gray-600 mb-2">Discount: ${discount}</p>
                <p class="text-gray-600 mb-2">Description: ${desc}</p>
                <p class="text-gray-600 mb-2">Creator: ${createdByEmail}</p>
                <p class="text-gray-600 mb-2">Delivery Location: ${deliveryLocation}</p>
                <div class="flex justify-between items-center">
                  <button
                    class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    ${
                      auth?.currentUser &&
                      product?.likes?.includes(auth?.currentUser.uid)
                        ? "Liked.."
                        : "Like"
                    } ${product?.likes?.length ? product?.likes?.length : ""}
                  </button>
      
                  <button
                  id = ${doc.id}
                  onclick = "deleteEvent(this)"
                  class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                 Delete
                </button>
                </div>
              </div>
            </div>`;
      
            window.deleteProduct = deleteProduct;
            products_cards_container.innerHTML += card;
            console.log(product);
          });
        } catch (err) {
          alert(err);
        }
      }
      
      async function deleteProduct(e) {
        console.log(e);
      
        const docRef = doc(db, "products", e.id);
        await deleteDoc(docRef);
        getMyproducts(auth.currentUser.uid);
      }