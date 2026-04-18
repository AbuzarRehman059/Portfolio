function toggleWishlist(id){
  let product = PRODUCTS.find(p => p.id === id);

  let exists = wishlist.find(p => p.id === id);

  if(exists){
    wishlist = wishlist.filter(p => p.id !== id);
    showToast("Removed from wishlist");
  } else {
    wishlist.push(product);
    showToast("Added to wishlist ❤️");
  }

  saveWishlist();
}