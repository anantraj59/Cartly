// Get ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const product = data.find(p => p.id == productId);

    if (product) {
      document.getElementById("productName").innerText = product.name;
      document.getElementById("productImage").src = product.image;
      document.getElementById("productPrice").innerText = "₹" + product.price;
      document.getElementById("productDesc").innerText = product.description;

document.getElementById("addBtn").onclick = function () {
   addToCart(product.id);
};
};
  });
  function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = products.find(p => p.id === id);

  const existingProduct = cart.find(item => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
document.getElementById("addBtn").onclick = function () {
  addToCart(product.id);
};