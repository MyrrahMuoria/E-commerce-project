document.addEventListener("DOMContentLoaded", () => {
    // Initialize the cart array
    let cart = [];

    // Function to add item to cart
    function addToCart(productTitle, productPrice) {
        // Check if item is already in the cart
        const existingItem = cart.find(item => item.title === productTitle);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ title: productTitle, price: productPrice, quantity: 1 });
        }
        updateCartCount();
        alert(`${productTitle} added to cart!`);
    }

    // Update cart count display
    function updateCartCount() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById("cart-count").innerText = cartCount;
    }

    // Attach event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", event => {
            const productCard = event.target.closest(".product-card");
            const productTitle = productCard.querySelector(".product-title").innerText;
            const productPrice = parseFloat(productCard.querySelector(".product-price").innerText.replace('$', ''));
            addToCart(productTitle, productPrice);
        });
    });

    // Filter products by category (e.g., Men, Women, Kids)
    const categoryLinks = document.querySelectorAll(".navbar a");
    categoryLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const category = event.target.getAttribute("href").replace(".html", "");
            filterProducts(category);
        });
    });

    function filterProducts(category) {
        const allProducts = document.querySelectorAll(".product-card");
        allProducts.forEach(product => {
            const isVisible = product.getAttribute("data-category") === category || category === "index";
            product.style.display = isVisible ? "block" : "none";
        });
    }

    // Theme switcher
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });
});
