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
      <a href="product.html?id=${product.id}">
        <img src="${product.image}" width="100%">
        <h3>${product.name}</h3>
      </a>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productList.appendChild(div);

  });

}
document.getElementById("search").addEventListener("input", function(e) {
  const searchValue = e.target.value.toLowerCase();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchValue)
  );

  renderFilteredProducts(filteredProducts);
});

function renderFilteredProducts(filtered) {
  productList.innerHTML = "";

  filtered.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productList.appendChild(div);
  });
}

function addToCart(id) {

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

function renderFilteredProducts(filtered) {
  productList.innerHTML = "";

  filtered.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productList.appendChild(div);
  });
}
function filterCategory(category) {
  if (category === "all") {
    renderFilteredProducts(products);
    return;
  }

  const filtered = products.filter(product =>
    product.category === category
  );

  renderFilteredProducts(filtered);
}
async function loadProducts(){

const querySnapshot = await getDocs(collection(db,"products"));

querySnapshot.forEach((doc)=>{

const product = doc.data();

console.log(product);

});

}

loadProducts();