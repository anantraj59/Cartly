const cartItems = document.getElementById("cartItems");
const totalEl = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart(){

cartItems.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

total += item.price * (item.quantity || 1);

const div = document.createElement("div");

div.innerHTML = `
<h3>${item.name}</h3>
<p>₹${item.price}</p>
<p>Quantity: ${item.quantity || 1}</p>
<button onclick="removeItem(${index})">Remove</button>
<hr>
`;

cartItems.appendChild(div);

});

totalEl.innerText = total;

}

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart", JSON.stringify(cart));

renderCart();

}

function clearCart(){

localStorage.removeItem("cart");

cart=[];

renderCart();

}

renderCart();