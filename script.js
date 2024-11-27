// Initialize the cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/** Add a product to the cart */
function addToCart(product, price, image) {
    const parsedPrice = parseFloat(price.replace('$', '').trim()); // Ensure price is a number

    if (isNaN(parsedPrice)) {
        console.error('Invalid price value:', price); // Log an error if the price is invalid
        return; // Stop execution if the price is invalid
    }

    // Check if the product already exists in the cart
    const existingItem = cart.find(item => item.product === product);

    if (existingItem) {
        // If the item exists, increment its quantity
        existingItem.quantity += 1;
    } else {
        // Add a new item to the cart
        cart.push({ product, price: parsedPrice.toFixed(2), quantity: 1, image });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart quantity display in the navbar
    updateCartQuantity();
}

/** Update the cart quantity display in the navbar */
function updateCartQuantity() {
    const cartQuantity = document.getElementById('cart-quantity');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartQuantity) {
        cartQuantity.textContent = totalItems;
    }
}

/** Redirect to the cart page when the "Cart" button is clicked */
function goToCartPage() {
    window.location.href = 'webstructure.html'; // Ensure this path matches your file structure
}

/** Update the cart page with item details on webstructure.html */
function updateCartPage() {
    const cartPageItems = document.getElementById('cart-page-items');
    const cartPageTotal = document.getElementById('cart-page-total');

    if (cart.length === 0) {
        cartPageItems.innerHTML = '<p>Your cart is empty!</p>';
        cartPageTotal.textContent = 'Total: $0.00';
        return;
    }

    cartPageItems.innerHTML = ''; // Clear previous content
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-content">
                <div class="cart-item-details">
                    <h3>${item.product}</h3>
                    <p>Price: $${parseFloat(item.price).toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartPageItems.appendChild(cartItem);
        total += item.quantity * parseFloat(item.price); // Calculate total for each item
    });

    cartPageTotal.textContent = `Total: $${total.toFixed(2)}`; // Display total cart value
}

/** Remove an item from the cart by index */
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item at the given index
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
    updateCartQuantity(); // Update cart icon quantity
    updateCartPage(); // Refresh cart page view
}

/** Show product details in the modal */
function showProductDetails(name, price, image) {
    const descriptions = {
        // Add product-specific descriptions here
    };

    const description = descriptions[name] || "No description available.";

    // Get the modal and content container
    const modal = document.getElementById("product-modal");
    const modalContent = document.getElementById("modal-content");

    // Create the HTML content for the modal
    modalContent.innerHTML = `
        <h3>${name}</h3>
        <img src="${image}" alt="${name}" class="modal-image">
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button class="add-to-cart" onclick="addToCart('${name}', '${price}', '${image}')">Add to Cart</button>
    `;

    // Show the modal
    modal.style.display = "block";
}
// Function to inject the modal into the DOM
function injectModal() {
    if (!document.getElementById("product-modal")) {
        const modal = document.createElement("div");
        modal.id = "product-modal";
        modal.className = "modal";
        modal.style.display = "none"; // Initially hidden

        modal.innerHTML = `
            <div id="modal-content" class="modal-content">
                <!-- Modal content will be dynamically populated here -->
            </div>
        `;
        document.body.appendChild(modal); // Append modal to the end of the document
    }
}

// Call this once to ensure the modal is added to the page
injectModal();

/** Close the modal */
function closeModal() {
    const modal = document.getElementById("product-modal");
    modal.style.display = "none";
}

// Close the modal if clicked outside of the modal content
window.onclick = function(event) {
    const modal = document.getElementById("product-modal");
    if (event.target === modal) {
        closeModal();
    }
};

/** Initialize the cart page functionality */
document.addEventListener('DOMContentLoaded', () => {
    updateCartPage(); // Update cart page when the document is ready
});

/** Search functionality */
const searchInput = document.getElementById('searchInput');
const productCards = document.querySelectorAll('.product-card');

// Listen for user input in the search bar
searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase(); // Convert to lowercase for case-insensitive search
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        card.style.display = productName.includes(searchTerm) ? 'block' : 'none';
    });
});

/** Generate a basic chatbot response */
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
    } else if (lowerCaseMessage.includes("size guide")) {
        return "You can find the size guide on each product page to help you choose the right fit.";
    } else if (lowerCaseMessage.includes("return policy")) {
        return "Our return policy allows returns within 30 days of purchase. Would you like more details?";
    } else if (lowerCaseMessage.includes("shipping")) {
        return "We offer various shipping options. Are you interested in standard or express delivery?";
    } else if (lowerCaseMessage.includes("discount")) {
        return "Looking for discounts? Check out our promotions section for the latest deals.";
    } else if (lowerCaseMessage.includes("order status")) {
        return "You can track your order status by entering your order number in the tracking section.";
    } else if (lowerCaseMessage.includes("store location")) {
        return "You can find our store locations on the 'Find Us' page. Can I help you with directions?";
    } else if (lowerCaseMessage.includes("new arrivals")) {
        return "Check out the 'New Arrivals' section for the latest additions to our collection.";
    } else if (lowerCaseMessage.includes("gift card")) {
        return "We offer gift cards in various denominations. Would you like to know more?";
    } else if (lowerCaseMessage.includes("contact support")) {
        return "You can contact our support team via chat, email, or phone. How would you like to reach us?";
    } else if (lowerCaseMessage.includes("out of stock")) {
        return "If a product is out of stock, you can sign up for a restock notification on the product page.";
    } else {
        return "I'm here to help! Can you please clarify your query?";
    }
}
