import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
apiKey:"AIzaSyANXW3CGn3ofb3gzb3CpXCw9oLebaAxiWI",
authDomain:"cartly-store.firebaseapp.com",
projectId:"cartly-store",
storageBucket:"cartly-store.firebasestorage.app",
messagingSenderId:"836220022823",
appId:"1:836220022823:web:ae9155eacd7d777df21e02"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth,(user)=>{
if(!user){
window.location.replace("login.html");
}
});
let products = [];

const productList = document.getElementById("products");

fetch("products.json")
.then(res => res.json())
.then(jsonProducts => {

   const adminProducts =
     JSON.parse(localStorage.getItem("adminProducts")) || [];

   products = [...jsonProducts, ...adminProducts];

   renderProducts(products);

});

function renderProducts(products) {

  productList.innerHTML = "";

  products.forEach(product => {

    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <a href="product.html?data=${encodeURIComponent(JSON.stringify(product))}">
        <img src="${product.image}" width="100%">
        <h3>${product.name}</h3>
      </a>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productList.appendChild(div);

  });

}

function renderFilteredProducts(filtered) {
  productList.innerHTML = "";

  filtered.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
<img src="${product.image}">
<h3>${product.name}</h3>
<p>Price: ₹${product.price}</p>
<p>${product.description || "No description available"}</p>
<button onclick="addToCart(${product.id})">
Add to Cart
</button>
`;

    productList.appendChild(div);
  });
}

window.addToCart = function(id) {

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const product = products.find(p => p.id == id);

if (!product) {
  alert("Product not found");
  return;
}

const existingProduct = cart.find(item => item.id == id);

if (existingProduct) {
  existingProduct.quantity += 1;
} else {
  cart.push({ ...product, quantity: 1 });
}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

alert("Added to cart");

}
function updateCartCount(){

const cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item=>{
total += item.quantity || 1;
});

document.getElementById("cart-count").innerText = total;

}
document.getElementById("search").addEventListener("input", function(e) {
  const searchValue = e.target.value.toLowerCase();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchValue)
  );

  renderFilteredProducts(filteredProducts);
});

async function loadProducts(){

const querySnapshot = await getDocs(collection(db,"Products"));

querySnapshot.forEach((doc)=>{

const product = {
  id: doc.id,
  ...doc.data()
};

products.push(product);

});

renderProducts(products);

}

loadProducts();