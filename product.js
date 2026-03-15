const params = new URLSearchParams(window.location.search);
const productData = JSON.parse(decodeURIComponent(params.get("data")));

document.getElementById("productName").innerText = productData.name;
document.getElementById("productImage").src = productData.image;
document.getElementById("productPrice").innerText = "₹" + productData.price;
document.getElementById("productDesc").innerText =
productData.description || "No description";

document.getElementById("addBtn").onclick = function () {
  addToCart(productData.id);
};