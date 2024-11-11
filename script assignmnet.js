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

// Chatbot Functionality
document.getElementById('send-message').addEventListener('click', handleUserMessage);

function handleUserMessage() {
  const userInput = document.getElementById('chatbot-input').value.trim();
  if (!userInput) return;

  displayMessage(`User: ${userInput}`, 'user-message');

  let botResponse = generateBotResponse(userInput);
  displayMessage(`Bot: ${botResponse}`, 'bot-message');

  document.getElementById('chatbot-input').value = ''; // Clear input after sending
}

function generateBotResponse(message) {
  message = message.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi')) {
    return 'Hello! Welcome to our clothing store. How can I help you today?';
  } else if (message.includes('men') || message.includes('women') || message.includes('kids') || message.includes('accessories')) {
    return `Sure, let me show you our ${message} section!`;
  } else if (message.includes('contact')) {
    return 'You can find our contact information on the Contact page.';
  } else if (message.includes('price') || message.includes('cost')) {
    return 'Please check the product pages for detailed pricing information.';
  } else {
    return 'I am here to help with store information, product sections, and basic assistance!';
  }
}

function displayMessage(text, className) {
  const messageContainer = document.getElementById('chatbot-messages');
  const messageElement = document.createElement('div');
  messageElement.className = className;
  messageElement.textContent = text;
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
