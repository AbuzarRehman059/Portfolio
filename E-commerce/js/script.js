const products = [
  { id: 1, name: "Sneakers", price: 1999, image: "Sneaker.jpg" },
  { id: 2, name: "T-Shirt", price: 999, image: "T-Shirt.jpg" },
  { id: 3, name: "Watch", price: 2499, image: "Watch.jpg" }
];

const container = document.getElementById("featuredProducts");

if(container){
  products.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.image}" width="100%">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let product = products.find(p => p.id === id);

  let existing = cart.find(item => item.id === id);

  if(existing){
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("Added to cart!");
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item => {
  total += item.price;
});

function displayProducts(data){
  const container = document.getElementById("productList");
  container.innerHTML = "";

  data.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.image}" width="100%">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
        <button onclick="addToWishlist(${p.id})">❤️</button>
      </div>
    `;
  });
}

function searchProducts(){
  let value = document.getElementById("search").value.toLowerCase();
  let filtered = products.filter(p => p.name.toLowerCase().includes(value));
  displayProducts(filtered);
}

function filterProducts(){
  let value = document.getElementById("filter").value;

  let filtered = products;

  if(value === "low"){
    filtered = products.filter(p => p.price < 1000);
  }
  else if(value === "high"){
    filtered = products.filter(p => p.price >= 1000);
  }

  displayProducts(filtered);
}

// Initial load
displayProducts(products);

function displayProducts(data){
  const container = document.getElementById("productList");
  container.innerHTML = "";

  data.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.image}" width="100%">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
        <button onclick="addToWishlist(${p.id})">❤️</button>
      </div>
    `;
  });
}

function searchProducts(){
  let value = document.getElementById("search").value.toLowerCase();
  let filtered = products.filter(p => p.name.toLowerCase().includes(value));
  displayProducts(filtered);
}

function filterProducts(){
  let value = document.getElementById("filter").value;

  let filtered = products;

  if(value === "low"){
    filtered = products.filter(p => p.price < 1000);
  }
  else if(value === "high"){
    filtered = products.filter(p => p.price >= 1000);
  }

  displayProducts(filtered);
}

// Initial load
displayProducts(products);

function showToast(msg){
  let toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}

function addToWishlist(id){
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  let product = products.find(p => p.id === id);

  if(!wishlist.find(item => item.id === id)){
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    showToast("Added to wishlist ❤️");
  } else {
    showToast("Already in wishlist");
  }
}