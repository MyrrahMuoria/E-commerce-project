// Initial variables and data structures
let cart = [];

// Add item to cart
function addToCart(productName, productPrice) {
  const productIndex = cart.findIndex((item) => item.name === productName);

  if (productIndex > -1) {
    cart[productIndex].quantity += 1;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }

  updateCartDisplay();
  updateTotalPrice();
}

// Remove item from cart
function removeFromCart(productName) {
  cart = cart.filter((item) => item.name !== productName);

  updateCartDisplay();
  updateTotalPrice();
}

// Update cart item count
function updateCartDisplay() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('.cart-count').innerText = `Items in Cart: ${cartCount}`;
}

// Calculate and display total price
function updateTotalPrice() {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  document.querySelector('.total-price').innerText = `Total: $${totalPrice.toFixed(2)}`;
}

// Event listeners for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    const productCard = event.target.closest('.product-card');
    const productName = productCard.querySelector('.product-title').innerText;
    const productPrice = parseFloat(productCard.querySelector('.product-price').innerText.replace('$', ''));
    addToCart(productName, productPrice);
  });
});
