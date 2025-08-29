// Load Navbar from external file
fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    updateCartCount();
  });

// Check if user is logged in
if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "index.html";
}

// Sample products array with external image URLs
let products = JSON.parse(localStorage.getItem("products")) || [
    { id: 1, name: "Dell XPS 13", price: 1200, image: "https://images.pexels.com/photos/18105/pexels-photo.jpg" },
    { id: 2, name: "HP Spectre x360", price: 1500, image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg" },
    { id: 3, name: "MacBook Pro", price: 2000, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
    { id: 4, name: "Lenovo ThinkPad", price: 1100, image: "https://images.pexels.com/photos/7974/pexels-photo.jpg" },
    { id: 5, name: "Asus ZenBook", price: 1300, image: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg" },
    { id: 6, name: "Microsoft Surface", price: 1400, image: "https://images.pexels.com/photos/374720/pexels-photo-374720.jpeg" },
    { id: 7, name: "Alienware Gaming Laptop", price: 2200, image: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg" }
];
// Save products to localStorage if not already present
if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(products));
}

// Display products
const container = document.getElementById("productsContainer");
function displayProducts() {
    container.innerHTML = "";
    products.forEach(product => {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card product-card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price}</p>
                        <button class="btn btn-primary me-2" onclick="addToCart(${product.id})">Add to Cart</button>
                        <button class="btn btn-danger" onclick="removeProduct(${product.id})">Remove</button>
                    </div>
                </div>
            </div>`;
        container.innerHTML += card;
    });
}

// Update cart count in Navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.getElementById("cartCount");
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Remove product
function removeProduct(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "This product will be removed permanently!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            products = products.filter(product => product.id !== id);
            localStorage.setItem("products", JSON.stringify(products));
            displayProducts();
            Swal.fire("Removed!", "The product has been removed.", "success");
        }
    });
}

// Add to cart
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === id);
    if (!cart.find(p => p.id === id)) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount(); // Update cart count after adding
        Swal.fire("Success!", `${product.name} has been added to the cart.`, "success");
    } else {
        Swal.fire("Info", `${product.name} is already in the cart.`, "info");
    }
}

// Logout function
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
}

// Display products and update cart count on page load
displayProducts();
updateCartCount();