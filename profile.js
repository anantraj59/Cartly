import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore, collection, getDocs, query, where }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


const firebaseConfig = {
apiKey:"YOUR_KEY",
authDomain:"YOUR_DOMAIN",
projectId:"YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


onAuthStateChanged(auth, async (user)=>{

if(!user){
window.location.href="login.html";
return;
}

document.getElementById("userName").innerText="Name: "+user.displayName;
document.getElementById("userEmail").innerText="Email: "+user.email;


const q = query(
collection(db,"Orders"),
where("userId","==",user.uid)
);

const querySnapshot = await getDocs(q);

querySnapshot.forEach((doc)=>{

const order = doc.data();

document.getElementById("orders").innerHTML += `
<div class="order">
<p>Total: ₹${order.total}</p>
<p>Status: ${order.status}</p>
<p>Date: ${order.date}</p>
</div>
`;

});

});


document.getElementById("logoutBtn").onclick=()=>{
signOut(auth);
};