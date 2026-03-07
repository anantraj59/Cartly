
const cart = JSON.parse(localStorage.getItem("cart")) || [];

let orderDetails = "";

cart.forEach(item => {
  orderDetails += item.name + " × " + item.quantity + " - ₹" + (item.price * item.quantity) + "\n";
});
const orderId = "ORD" + Math.floor(Math.random()*100000);
formData.append("order_id", orderId);
document.getElementById("orderDetails").value = orderDetails;
document.getElementById("checkoutForm").addEventListener("submit", function(){


});