import {
   auth , createUserWithEmailAndPassword , storage , doc , setDoc , ref , uploadBytes , getDownloadURL, db 
} from '../../Utils/utils.js'

const signup_form = document.getElementById("signup_form");
const signup_btn = document.getElementById("signup_btn");

signup_form.addEventListener("submit" , function(e){
    e.preventDefault();

    const img = e.target[0].files[0];
    const email = e.target[1].value;
    const password = e.target[2].value;
    const firstName = e.target[4].value;
    const lastName = e.target[5].value;
    const phone = e.target[6].value;
    const company = e.target[7].value;
    
    const userInfo = {
        img , email , password , firstName , lastName , phone , company
    };

    //Create Account..
    signup_btn.disabled = true;
    signup_btn.innerText = "Loading..."
    createUserWithEmailAndPassword(auth , email , password).then((user)=>{
        console.log('user=>',user.user.uid);
        //upload user Image....
        const userRef = ref(storage , `user/${user.user.uid}`)

        uploadBytes(userRef , img).then(()=>{
            console.log('User Image Uploaded..');
          // Getting Url Of the Image Uploaded..
            getDownloadURL(userRef).then((url)=> {
                console.log('Url AaGya=>', url);

                //Updated userInfo Object "img"
                userInfo.img = url;

                //Created User Documents Reference
                const userDbRef = doc(db , "users" , user.user.uid);

                //Set This Document To Db...
                setDoc(userDbRef , userInfo).then(()=>{
                    console.log("User Object Updated into Db");
                    window.location.href = "/";
                    signup_btn.disabled = false;
                    signup_btn.innerText = "Sign Up";
                })

            }).catch((err) => {console.log('Url nai Mila')
            signup_btn.disabled = false;
            signup_btn.innerText = "Sign Up";})

        }).catch((err) => {console.log('Error In Uploading Image..')
        signup_btn.disabled = false;
        signup_btn.innerText = "Sign Up";});

    }).catch((err) => {alert(err)
        signup_btn.disabled = false;
        signup_btn.innerText = "Sign Up";})
})