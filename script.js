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
