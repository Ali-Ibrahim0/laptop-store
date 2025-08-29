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

// Display cart items
const cartContainer = document.getElementById("cartContainer");
const cartTotalElement = document.getElementById("cartTotal");
function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center">Your cart is empty.</p>';
        cartTotalElement.textContent = "0";
        updateCartCount();
        return;
    }

    cart.forEach(product => {
        total += product.price;
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card product-card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price}</p>
                        <button class="btn btn-danger" onclick="removeFromCart(${product.id})">Remove</button>
                    </div>
                </div>
            </div>`;
        cartContainer.innerHTML += card;
    });

    cartTotalElement.textContent = total.toFixed(2);
    updateCartCount();
}

// Update cart count in Navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.getElementById("cartCount");
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Remove product from cart
function removeFromCart(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "This product will be removed from your cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart = cart.filter(product => product.id !== id);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
            Swal.fire("Removed!", "The product has been removed from your cart.", "success");
        }
    });
}

// Placeholder for checkout (to be implemented later)
function proceedToCheckout() {
    Swal.fire({
        icon: "info",
        title: "Checkout",
        text: "Checkout functionality is not implemented yet."
    });
}

// Logout function
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
}

// Display cart on page load
displayCart();