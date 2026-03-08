import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup,
RecaptchaVerifier,
signInWithPhoneNumber
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {

apiKey: "YOUR_KEY",
authDomain: "YOUR_DOMAIN",
projectId: "YOUR_PROJECT_ID"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



window.signup = function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

createUserWithEmailAndPassword(auth,email,password)
.then(()=>alert("Signup Success"))
.catch(e=>alert(e.message));

}


window.login = function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

signInWithEmailAndPassword(auth,email,password)
.then(()=>alert("Login Success"))
.catch(e=>alert(e.message));

}



window.googleLogin = function(){

const provider = new GoogleAuthProvider();

signInWithPopup(auth,provider)
.then(()=>alert("Google Login Success"))
.catch(e=>alert(e.message));

}



window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha',{});

window.sendOTP = function(){

const phone = document.getElementById("phone").value;

signInWithPhoneNumber(auth,phone,window.recaptchaVerifier)
.then((result)=>{

window.confirmationResult=result;

alert("OTP Sent");

});

}



window.verifyOTP = function(){

const code = document.getElementById("otp").value;

confirmationResult.confirm(code)
.then(()=>alert("Phone Login Success"));

}