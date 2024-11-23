const products = [
    { id: 1, name: "Stylish Shirt", price: 25.0, category: "men", image: "images/shirt1.jpeg" },
    { id: 2, name: "Casual Shorts", price: 15.0, category: "women", image: "images/short1.jpeg" },
    { id: 3, name: "Denim Shorts", price: 20.0, category: "women", image: "images/short2.jpeg" },
    // Add more products as needed
];

// Initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartDisplay();

// Dynamically generate product cards (call this function on page load)
function generateProductCards(category = "all") {
    const productContainer = document.getElementById("product-list");
    if (!productContainer) return;

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

// Add product to cart
function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart display
function updateCartDisplay() {
    const cartDisplay = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartIcon = document.getElementById("cart-icon");

    if (!cartDisplay || !totalPriceElement || !cartIcon) return;

    cartDisplay.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
        total += item.price * item.quantity;
        cartDisplay.innerHTML += `
            <div>
                <p>${item.name} x${item.quantity} - $${item.price}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });

    totalPriceElement.innerText = `Total: $${total.toFixed(2)}`;
    cartIcon.innerText = `Cart (${cart.length})`;
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    updateCartDisplay();
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Filter products by category
document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const category = event.target.dataset.category || "all";
        generateProductCards(category);
    });
});

// Search products
const searchInput = document.getElementById("search");
if (searchInput) {
    searchInput.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase();
        document.querySelectorAll(".product-card").forEach((card) => {
            const productName = card.querySelector("h4").innerText.toLowerCase();
            card.style.display = productName.includes(searchTerm) ? "block" : "none";
        });
    });
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
    generateProductCards(); // Load all products by default
    updateCartDisplay(); // Sync cart with localStorage
});
