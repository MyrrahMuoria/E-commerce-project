// JavaScript: Shopping Cart, Filtering, and Search

// Product data (replace with dynamic loading if available)
const products = [
    { id: 1, name: "Product 1", price: 10.0, category: "category1" },
    { id: 2, name: "Product 2", price: 20.0, category: "category2" },
    // Add more products here
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartDisplay();

// Event listener for adding products to cart
document.querySelectorAll(".add-to-cart").forEach((button, index) => {
    button.addEventListener("click", () => addToCart(products[index]));
});

// Add product to cart
function addToCart(product) {
    const item = cart.find((item) => item.id === product.id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart display
function updateCartDisplay() {
    const cartDisplay = document.getElementById("cart-items");
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
    document.getElementById("total-price").innerText = total.toFixed(2);
    document.getElementById("cart-icon").innerText = `Cart (${cart.length})`;
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    updateCartDisplay();
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Category filtering
document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const category = event.target.dataset.category;
        document.querySelectorAll(".product-card").forEach((card) => {
            card.style.display = category === "all" || card.dataset.category === category ? "block" : "none";
        });
    });
});

// Product search functionality
document.getElementById("search").addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    document.querySelectorAll(".product-card").forEach((card) => {
        const productName = card.querySelector("h2").innerText.toLowerCase();
        card.style.display = productName.includes(searchTerm) ? "block" : "none";
    });
});
