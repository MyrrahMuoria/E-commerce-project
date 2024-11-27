function generateProductCards(category = "all") {
    const productContainer = document.getElementById("product-list");
    if (!productContainer) return; // Exit if the element is not found

    productContainer.innerHTML = ""; // Clear existing cards
    products.forEach((product) => {
        if (category === "all" || product.category === category) {
            productContainer.innerHTML += `
                <div class="product-card" data-category="${product.category}">
                    <img src="${product.image}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <p>$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
        }
    });

    // Reattach event listeners for "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = parseInt(event.target.dataset.id, 10);
            const product = products.find((p) => p.id === productId);
            addToCart(product);
        });
    });
}

// Update cart display (check for required elements)
function updateCartDisplay() {
    const cartDisplay = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartIcon = document.getElementById("cart-icon");

    if (!cartDisplay && !totalPriceElement && !cartIcon) return; // Exit if cart elements are not on the page

    if (cartDisplay) cartDisplay.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
        total += item.price * item.quantity;
        if (cartDisplay) {
            cartDisplay.innerHTML += `
                <div>
                    <p>${item.name} x${item.quantity} - $${item.price}</p>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
        }
    });

    if (totalPriceElement) totalPriceElement.innerText = `Total: $${total.toFixed(2)}`;
    if (cartIcon) cartIcon.innerText = `Cart (${cart.length})`;
}

// Filter products by category (add check for presence of links)
const navLinks = document.querySelectorAll("nav ul li a");
if (navLinks) {
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const category = event.target.dataset.category || "all";
            generateProductCards(category);
        });
    });
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-list");
    if (productContainer) generateProductCards(); // Only generate products if #product-list exists
    updateCartDisplay(); // Sync cart with localStorage
});



// Chatbot Response Functionality
document.addEventListener("DOMContentLoaded", () => {
    const chatbot = document.querySelector(".chatbot");
    const chatbotHeader = document.querySelector(".chatbot-header");
    const chatbotMessages = document.querySelector(".chatbot-messages");
    const chatbotInput = document.getElementById("chatbot-input");
    const sendMessageButton = document.getElementById("send-message");

    // Toggle chatbot visibility
    chatbotHeader.addEventListener("click", () => {
        chatbot.classList.toggle("active");
    });

    // Send chatbot message
    sendMessageButton.addEventListener("click", () => {
        const userMessage = chatbotInput.value.trim();
        if (!userMessage) return; // Exit if input is empty

        // Display user's message
        appendChatMessage("user", userMessage);

        // Generate chatbot's response
        setTimeout(() => {
            const botResponse = generateChatbotResponse(userMessage);
            appendChatMessage("bot", botResponse);
        }, 500);

        chatbotInput.value = ""; // Clear input
    });

    // Append a message to the chatbot interface
    function appendChatMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add(`${sender}-message`);
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll
    }

    // Generate a basic chatbot response
    function generateChatbotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        if (lowerCaseMessage.includes("hello")) {
            return "Hi there! How can I help you today?";
        } else if (lowerCaseMessage.includes("product")) {
            return "Are you looking for details about a specific product?";
        } else if (lowerCaseMessage.includes("cart")) {
            return "You can view your cart using the cart icon in the header.";
        } else if (lowerCaseMessage.includes("checkout")) {
            return "Proceed to the checkout section to complete your purchase.";
        } else {
            return "I'm here to help! Can you please clarify your query?";
        }
    }
});



function updateCartUI() {
  let cartMessage = "Your cart contains:\n";
  cart.forEach(item => {
    cartMessage += `- ${item.name} ($${item.price})\n`;
  });
  // Update the chatbot's message display
  updateChatbot(cartMessage);
}

function getCartContents() {
  if (cart.length === 0) {
    return "Your cart is empty.";
  }
  return "Your cart contains: " + cart.map(item => `${item.name} ($${item.price})`).join(", ");
}
