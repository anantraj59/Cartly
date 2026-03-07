let products = JSON.parse(localStorage.getItem("adminProducts")) || [];

function saveProducts(){
  localStorage.setItem("adminProducts", JSON.stringify(products));
}

function addProduct(){

  const product = {
    id: Date.now(),
    name: document.getElementById("name").value,
    price: Number(document.getElementById("price").value),
    image: document.getElementById("image").value,
    category: document.getElementById("category").value,
    description: document.getElementById("desc").value
  };

  products.push(product);

  saveProducts();

  renderProducts();
}

function renderProducts(){

  const container = document.getElementById("adminProducts");

  container.innerHTML = "";

  products.forEach(p => {

    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="deleteProduct(${p.id})">Delete</button>
      <hr>
    `;

    container.appendChild(div);

  });

}

function deleteProduct(id){

  products = products.filter(p => p.id !== id);

  saveProducts();

  renderProducts();

}

renderProducts();