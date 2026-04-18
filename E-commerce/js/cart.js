cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart(){
  const container = document.getElementById("cartItems");
  if(!container) return;

  container.innerHTML = "";
  let total = 0;

  if(cart.length === 0){
    container.innerHTML = "<h3>Cart is empty</h3>";
    return;
  }

  cart.forEach((item, i) => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div class="cart-card">
        <img src="${item.image}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>

        <div>
          <button onclick="dec(${i})">-</button>
          ${item.qty}
          <button onclick="inc(${i})">+</button>
        </div>

        <button onclick="removeItem(${i})">Remove</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}
function addToCart(id){
  id = Number(id); // fix type issues

  let product = PRODUCTS.find(p => p.id === id);

  if(!product){
    console.error("Product not found:", id);
    return;
  }

  let existing = cart.find(item => item.id === id);

  if(existing){
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  console.log("Cart:", cart); // debug
  showToast("Added to cart 🛒");
}

function inc(i){
  cart[i].qty++;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function dec(i){
  if(cart[i].qty > 1){
    cart[i].qty--;
  } else {
    cart.splice(i, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(i){
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();