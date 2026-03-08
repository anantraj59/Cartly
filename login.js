import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup,
RecaptchaVerifier,
signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {

apiKey: "AIzaSyANXW3CGn3ofb3gzb3CpXCw9oLebaAxiWI",
authDomain: "cartly-store.firebaseapp.com",
projectId: "cartly-store",
storageBucket: "cartly-store.firebasestorage.app",
messagingSenderId: "836220022823",
appId: "1:836220022823:web:ae9155eacd7d777df21e02"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



window.signup = function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

createUserWithEmailAndPassword(auth,email,password)
.then(()=>{

alert("Signup successful");
window.location.href="index.html";

})
.catch(err=>alert(err.message));

}



window.login = function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

signInWithEmailAndPassword(auth,email,password)
.then(()=>{

alert("Login successful");
window.location.href="index.html";

})
.catch(err=>alert(err.message));

}



window.googleLogin = function(){

const provider = new GoogleAuthProvider();

signInWithPopup(auth,provider)
.then(()=>{

alert("Google login success");
window.location.href="index.html";

})
.catch(err=>alert(err.message));

}



window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container',{});

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
.then(()=>{

alert("Phone login success");
window.location.href="index.html";

});

}