import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
sendEmailVerification,
sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

apiKey: "AIzaSyANXW3CGn3ofb3gzb3CpXCw9oLebaAxiWI",
authDomain: "cartly-store.firebaseapp.com",
projectId: "cartly-store",
appId: "1:836220022823:web:ae9155eacd7d777df21e02"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



window.signup = function(){

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;
let confirm = document.getElementById("confirmPassword").value;

if(password !== confirm){
alert("Passwords do not match");
return;
}

createUserWithEmailAndPassword(auth,email,password)

.then((userCredential)=>{

sendEmailVerification(userCredential.user);

alert("Signup successful. Verify your email.");

})

.catch(err=>alert(err.message));

}



window.login = function(){

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

signInWithEmailAndPassword(auth,email,password)

.then((userCredential)=>{

if(!userCredential.user.emailVerified){

alert("Please verify your email first");
return;

}

window.location.href="index.html";

})

.catch(err=>alert(err.message));

}



window.resetPassword = function(){

let email = document.getElementById("email").value;

sendPasswordResetEmail(auth,email)

.then(()=>{

alert("Password reset email sent");

})

.catch(err=>alert(err.message));

}