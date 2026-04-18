let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function saveWishlist(){
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Toast
function showToast(msg){
  let toast = document.getElementById("toast");
  if(!toast) return;

  toast.innerText = msg;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}

// PRODUCTS
function renderProducts(){
  const container = document.getElementById("productList");
  if(!container) return;

  let search = document.getElementById("search")?.value.toLowerCase() || "";
  let filter = document.getElementById("filter")?.value || "all";

  let data = PRODUCTS.filter(p => p.name.toLowerCase().includes(search));

  if(filter === "low") data = data.filter(p => p.price < 1000);
  if(filter === "high") data = data.filter(p => p.price >= 1000);

  container.innerHTML = "";

  data.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add</button>
        <button onclick="toggleWishlist(${p.id})">❤️</button>
      </div>
    `;
  });
}

// CART
function addToCart(id){
  id = Number(id);

  let item = PRODUCTS.find(p => p.id === id);

  if(!item){
    console.error("Product not found:", id);
    return;
  }

  let exists = cart.find(c => c.id === id);

  if(exists){
    exists.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  saveCart();
  showToast("Added to cart 🛒");
}

// WISHLIST
function toggleWishlist(id){
  let item = PRODUCTS.find(p => p.id === id);
  let exists = wishlist.find(w => w.id === id);

  if(exists){
    wishlist = wishlist.filter(w => w.id !== id);
    showToast("Removed from wishlist");
  } else {
    wishlist.push(item);
    showToast("Added to wishlist ❤️");
  }

  saveWishlist();
}

renderProducts();
window.addToCart = addToCart;
window.toggleWishlist = toggleWishlist;